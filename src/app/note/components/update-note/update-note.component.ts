import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { CompoService } from 'src/app/shared/services/compo.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  currentUser : User = {};
  note : Note = {};
  compos : Compo[] = [];
  updateNoteFG : FormGroup = this.formBuilder.group({});


  constructor(

    private userService : UserService,
    private noteService : NoteService,
    private compoService : CompoService,
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router
    
  ) { }

  ngOnInit(): void {

    // Soucription à l'utilisateur courant
    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();

    // On recois la note
    this.note = this.activatedRoute.snapshot.data['noteResolue'];

    // On va rechercher les composants de la note
    this.compoService.getComponentsByNote(this.note.id!).subscribe(
      (compos : Compo[]) => {
        this.compos = compos;
      }
    )

    // Création du formulaire
    this.updateNoteFG = this.formBuilder.group({
      titleControl: [this.note.title, Validators.required],
      isPublicControl: [this.note.isPublic, Validators.required],
    });

  }

  updateNote() {

    this.note.title = this.updateNoteFG.value['titleControl'];

    // TO DO: Ajouter Logique des Catégories
    this.note.category_Id = 1;

    this.noteService.setVisibility(this.note.id!, this.updateNoteFG.value['isPublicControl']).subscribe(
      () => {}
    );

    this.noteService.updateNote(this.note).subscribe(
      () => {
        this.router.navigate(['note/user-notes/' + this.currentUser.id]);
      }
    );

  }

}
