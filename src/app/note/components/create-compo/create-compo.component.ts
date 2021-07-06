import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { User } from 'src/app/shared/models/user';
import { CompoService } from 'src/app/shared/services/compo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-compo',
  templateUrl: './create-compo.component.html',
  styleUrls: ['./create-compo.component.scss']
})
export class CreateCompoComponent implements OnInit {

  createCompoFG : FormGroup = this.formBuilder.group({});
  newCompo : Compo = {};
  currentUser : User = {};
  previousUrl : string = "";
  sendButtonState : Boolean = true;

  constructor(

    private formBuilder : FormBuilder,
    private compoService : CompoService,
    private userService : UserService,
    private router : Router

  ) { }

  ngOnInit(): void {

    this.previousUrl = (this.router.url.split('/')[2]);

    // On récupère un nouveau FormGroup déja configuré dans le service
    this.createCompoFG = this.compoService.getFormNewCompo();

    this.userService.currentUseSubject.subscribe(
      (u : User) => {
          this.currentUser = u;
        }
      )
      this.userService.emitUser();
  }

  postNewCompo() {
      
    // Binding du formulaire grâce au service
    this.newCompo = this.compoService.bindFormNewCompo(this.createCompoFG);
    this.newCompo.user_Id = this.currentUser.id;

    // TO DO: Ajouter Logique Categorie
    this.newCompo.category_Id = 1;

    // Envois de la requête POST
    this.compoService.createCompo(this.newCompo).subscribe(
      () => {

        if (this.previousUrl == 'create-compo') {
          // Redirection vers Liste des compos utilisateur
          this.router.navigate(['note/user-compos/' + this.currentUser.id]);
        }
        else if(this.previousUrl == 'create-note') {
          this.sendButtonState = false;
        }
      }
    );
  }

}
