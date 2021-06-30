import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  createNoteFG : FormGroup = this.formBuilder.group({});
  newNote : Note = {};
  currentUser : User = {};
  // TEST
  userId? : number;

  constructor(

    private formBuilder : FormBuilder,
    private noteService : NoteService,
    private userService : UserService

  ) { }

  ngOnInit(): void {

    this.createNoteFG = this.formBuilder.group(
      {
        titleControl: [null, Validators.required],
        categoryControl: [null, Validators.required],
        isPublicControl: [null, Validators.required],
        parentNote_IdControl: [null, Validators.required],
      }
    );

    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;

        // TEST
        this.userId = u.id;
        console.log('id recue: ' + u.id)
      }
      )
    }
    
    postNewNote() {
      
      this.newNote.title = this.createNoteFG.value['titleControl'];
      this.newNote.category = this.createNoteFG.value['categoryControl'];
      this.newNote.isPublic = this.createNoteFG.value['isPublicControl'];
      this.newNote.parentNote_Id = this.createNoteFG.value['parentNote_IdControl'];
      this.newNote.user_Id = 1;
      // this.newNote.user_Id = this.userId;
      // this.newNote.user_Id = this.currentUser.id;
      // console.log(this.currentUser);

    // Envois de la requête POST
    this.noteService.postNewNote(this.newNote).subscribe(
      () => {}
    );
  }

}
