import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  note : Note = {}
  updateNoteFG : FormGroup = this.formBuilder.group({});
  currentUser : User = {}

  constructor(

    private noteService : NoteService,
    private userService : UserService,
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router
    
  ) { }

  ngOnInit(): void {

    this.note = this.activatedRoute.snapshot.data['noteResolue'];

    this.updateNoteFG = this.formBuilder.group({
      titleControl: [this.note.title, Validators.required],
      categoryControl: [this.note.category, Validators.required]
    });

    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();

  }

  updateNote() {

    this.note.title = this.updateNoteFG.value['titleControl'];
    this.note.category = this.updateNoteFG.value['categoryControl'];
    this.noteService.updateNote(this.note).subscribe(
      () => {
        this.router.navigate(['note/user-notes/' + this.currentUser.id]);
      }
    )
  }

}
