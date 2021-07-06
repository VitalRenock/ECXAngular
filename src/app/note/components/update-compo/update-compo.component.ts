import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { User } from 'src/app/shared/models/user';
import { CompoService } from 'src/app/shared/services/compo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-compo',
  templateUrl: './update-compo.component.html',
  styleUrls: ['./update-compo.component.scss']
})
export class UpdateCompoComponent implements OnInit {

  compo : Compo = {}
  updateCompoFG : FormGroup = this.formBuilder.group({});
  currentUser : User = {}

  constructor(

    private compoService : CompoService,
    private userService : UserService,
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router

  ) { }

  ngOnInit(): void {

    this.compo = this.activatedRoute.snapshot.data['compoResolus'];

    this.updateCompoFG = this.formBuilder.group({
      titleControl: [this.compo.title, Validators.required],
      typeControl: [this.compo.type, Validators.required],
      contentControl: [this.compo.content, Validators.required],
      descriptionControl: [this.compo.description, Validators.required],
      urlControl: [this.compo.url, Validators.required]
    });

    // Je vais rechercher l'Utilisateur
    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();
  }

  updateNote() {

    this.compo.title = this.updateCompoFG.value['titleControl'];
    this.compo.type = this.updateCompoFG.value['typeControl'];
    this.compo.content = this.updateCompoFG.value['contentControl'];
    this.compo.description = this.updateCompoFG.value['descriptionControl'];
    this.compo.url = this.updateCompoFG.value['urlControl'];

    // TO DO: Ajouter Logique des Catégories
    this.compo.category_Id = 1;

    this.compoService.updateCompo(this.compo).subscribe(
      () => {
        this.router.navigate(['note/user-compos/' + this.currentUser.id]);
      }
    )
  }

}
