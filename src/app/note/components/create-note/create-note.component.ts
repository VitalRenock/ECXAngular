import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { Category } from 'src/app/shared/models/category';
import { Compo } from 'src/app/shared/models/compo';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CompoService } from 'src/app/shared/services/compo.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CreateCompoComponent } from '../create-compo/create-compo.component';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  newNote: Note = {};
  currentUser: User = {};

  createNoteFG: FormGroup = this.formBuilder.group({});
  compoList: FormArray = this.formBuilder.array([]);

  categories: Category[] = []
  // composCategory = []

  constructor(

    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private compoService: CompoService,
    private userService: UserService,
    private categoryServive: CategoryService,
    private router: Router,
    private windowService: NbWindowService

  ) { }

  ngOnInit(): void {

    this.createNoteFG = this.formBuilder.group(
      {
        titleControl: [null, Validators.required],
        isPublicControl: [null, Validators.required],
        parentNote_IdControl: [null, Validators.required],

        compoList: this.formBuilder.array([])
      }
    );

    // On récupère l'utilisateur connecté
    this.userService.currentUseSubject.subscribe(
      (u: User) => {
        this.currentUser = u;
      }
    );
    // On émet l'utilisateur à tous les composants abonnés
    this.userService.emitUser();

    // On récupère toutes les catégories
    this.categoryServive.getAllCategories().subscribe(
      (c : Category[]) => {
        this.categories = c;
        // On assigne par défaut à la futur note créée, la première catégorie existante
        this.newNote.category_Id = this.categories[0].id;
      }
    );

  }

  postNewNote() {

    // Binding du formulaire Note
    this.newNote.title = this.createNoteFG.value['titleControl'];
    this.newNote.isPublic = this.createNoteFG.value['isPublicControl'];
    this.newNote.parentNote_Id = this.createNoteFG.value['parentNote_IdControl'];
    this.newNote.user_Id = this.currentUser.id;

    // Envois de la requête POST
    this.noteService.postNewNote(this.newNote).subscribe(
      (noteid: number) => {

        // Traitement des formulaires pour les composants
        // let myItems = this.getItems().value
        for (let i = 0; i < this.getItems().length; i++) {

          // Binding du forumlaire pour chaque composant
          let newComponent: Compo = {};
          newComponent = this.compoService.bindFormNewCompo(this.getItems().at(i) as FormGroup);
          newComponent.user_Id = this.currentUser.id;

          // TO DO: Gérer le type des composants
          newComponent.type = 'Image';

          // On récupère l'id de chaque nouveau composant crée
          let categoryName = document.getElementById('categoryCompo' + i)?.innerText;
          newComponent.category_Id = this.categories.find(c => c.name == categoryName)?.id;

          // On crée chaque composant et on réceptionne l'id
          this.compoService.createCompo(newComponent).subscribe(
            (compoid: number) => {

              // On lie le composant crée à la note créee grâce aux id's recus
              this.compoService.addCompoToNote(noteid, compoid).subscribe(
                (noteCompoId: number) => { }
              )
            }
          )
        }

        // Redirection vers Liste des notes utilisateur
        this.router.navigate(['note/user-notes/' + this.currentUser.id]);
      }
    );
  }


  addItem() {
    this.getItems().push(this.compoService.getFormNewCompo());
  }

  removeItem(id: number) {
    this.getItems().removeAt(id);
  }

  getItems() {
    return this.createNoteFG.get('compoList') as FormArray;
  }

  // Obsolète (Démo de formulaire Pop-Up)
  openWindow() {
    this.windowService.open(CreateCompoComponent, { title: `Test` });
  }

}