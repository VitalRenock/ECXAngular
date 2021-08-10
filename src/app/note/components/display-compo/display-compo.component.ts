import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Compo } from 'src/app/shared/models/compo';
import { User } from 'src/app/shared/models/user';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CompoService } from 'src/app/shared/services/compo.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-display-compo',
  templateUrl: './display-compo.component.html',
  styleUrls: ['./display-compo.component.scss']
})
export class DisplayCompoComponent implements OnInit {

  currentUser : User = {}

  compo : Compo = {}
  category : Category = {}

  creator : User = {}
  prefixCreator : string = environment.prefixCreator
  
  previousRoute : string = ''


  constructor(

    private activatedroute : ActivatedRoute,
    private compoService : CompoService,
    private categoryService : CategoryService,
    private userService : UserService,
    private router : Router

  ) { }

  ngOnInit(): void {

    // Gestion de l'url précédente
    this.previousRoute = sessionStorage.getItem('previousRoute') ?? 'Error';

    // On récupere le composant par le resolver
    this.compo = this.activatedroute.snapshot.data['compoResolus'];

    // On va rechercher le créateur du composant
    this.userService.getUserById(this.compo.user_Id!).subscribe(
      (u : User) => {
        this.creator = u;
      }
    );

    // On va rechercher la catégorie du composant
    this.categoryService.getCategoryById(this.compo.category_Id!).subscribe(
      (c : Category) => {
        this.category = c;
      }
    )

    // Je vais rechercher mon Utilisateur
    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();
  }

}
