import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { Compo } from 'src/app/shared/models/compo';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
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

  newNote : Note = {};
  currentUser : User = {};
  
  createNoteFG : FormGroup = this.formBuilder.group({});
  compoList : FormArray = this.formBuilder.array([]);

  constructor(

    private formBuilder : FormBuilder,
    private noteService : NoteService,
    private compoService : CompoService,
    private userService : UserService,
    private router : Router,
    private windowService : NbWindowService

  ) { }

  ngOnInit(): void {

    this.createNoteFG = this.formBuilder.group(
      {
        titleControl: [null, Validators.required],
        categoryControl: [null, Validators.required],
        isPublicControl: [null, Validators.required],
        parentNote_IdControl: [null, Validators.required],

        compoList: this.formBuilder.array([])
      }
    );

    // On récupère l'utilisateur connecté
    this.userService.currentUseSubject.subscribe(
      (u : User) => {
          this.currentUser = u;
        }
      )
      this.userService.emitUser();
    }
    
    postNewNote() {
      
      // Binding du formulaire Note
      this.newNote.title = this.createNoteFG.value['titleControl'];
      this.newNote.category = this.createNoteFG.value['categoryControl'];
      this.newNote.isPublic = this.createNoteFG.value['isPublicControl'];
      this.newNote.parentNote_Id = this.createNoteFG.value['parentNote_IdControl'];
      this.newNote.user_Id = this.currentUser.id;

      // Envois de la requête POST
      this.noteService.postNewNote(this.newNote).subscribe(
        (noteid : number) => {

          console.log('Note id recue: ' + noteid);

          // Traitement des formulaires pour les composants
          let myItems = this.getItems().value
          for(let i = 0; i < this.getItems().length; i++){
            
            // Binding du forumlaire pour chaque composant
            let newComponent : Compo = {};
            newComponent = this.compoService.bindFormNewCompo(this.getItems().at(i) as FormGroup);
            newComponent.user_Id = this.currentUser.id;

            // On crée chaque composant et on réceptionne l'id
            this.compoService.createCompo(newComponent).subscribe(
              (compoid : number) => {

                // On lie le composant crée à la note créee grâce aux id's recus
                this.compoService.addCompoToNote(noteid, compoid).subscribe(
                  (noteCompoId : number) => { }
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

  removeItem(id : number) {
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