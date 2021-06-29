import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {

  userNotes : Note[]= []

  constructor(

    private activatedRoute : ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.userNotes = this.activatedRoute.snapshot.data['userNotesResolues'];
  }

}
