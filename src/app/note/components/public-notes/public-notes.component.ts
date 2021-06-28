import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-public-notes',
  templateUrl: './public-notes.component.html',
  styleUrls: ['./public-notes.component.scss']
})
export class PublicNotesComponent implements OnInit {

  constructor(

    private noteService : NoteService
    
  ) { }

  ngOnInit(): void {
  }

}
