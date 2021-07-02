import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {

  userNotes : Note[]= []
  currentUser : User = {}

  constructor(

    private activatedRoute : ActivatedRoute,
    private userService : UserService,
    private noteService : NoteService

  ) { }

  ngOnInit(): void {

    this.userNotes = this.activatedRoute.snapshot.data['notesResolues'];
    
    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();
  }

  deleteNote(id : number) {

    this.noteService.deleteNote(id).subscribe(
      () => {
        this.noteService.getAllUserNotes(this.currentUser.id ?? 0).subscribe(
          (n : Note[]) => {
            this.userNotes = n;
          }
        )
      }
    )
  }

}
