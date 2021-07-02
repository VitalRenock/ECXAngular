import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { CompoService } from 'src/app/shared/services/compo.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  note : Note = {}
  compos : Compo[] = []
  previousRoute : string = ''
  currentUser : User = {}

  constructor(
    
    private activatedroute : ActivatedRoute,
    private compoService : CompoService,
    private noteService : NoteService,
    private userService : UserService,
    private router : Router

  ) { }

  ngOnInit(): void {

    this.note = this.activatedroute.snapshot.data['noteResolue'];
    this.previousRoute = sessionStorage.getItem('previousRoute') ?? 'Error';

    // Je vais rechercher les composants de ma note
    this.compoService.getComponentsByNote(this.note.id ?? 0).subscribe(
      (compoList : Compo[]) => {
        this.compos = compoList;
      }
    );

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
        this.router.navigate(['note/user-notes/' + this.currentUser.id]);
      }
    )
  }

}