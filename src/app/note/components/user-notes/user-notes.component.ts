import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit, OnDestroy {

  userNotes : Note[]= []
  currentUser : User = {}
  sub : Subscription = new Subscription()

  categories : string[] = []

  constructor(

    private activatedRoute : ActivatedRoute,
    private userService : UserService,
    private noteService : NoteService

  ) { }


  ngOnInit(): void {

    this.userNotes = this.activatedRoute.snapshot.data['notesResolues'];
    
    this.sub = this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();

    this.noteService.getCategories().subscribe(
      (c : string[]) => { 
        this.categories = c;
      }
    );

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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
