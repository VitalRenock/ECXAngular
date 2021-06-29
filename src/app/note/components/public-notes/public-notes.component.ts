import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/shared/models/note';

@Component({
  selector: 'app-public-notes',
  templateUrl: './public-notes.component.html',
  styleUrls: ['./public-notes.component.scss']
})
export class PublicNotesComponent implements OnInit {

  notesPublic : Note[] = []
  category : string = ""

  constructor(

    private activatedRoute : ActivatedRoute
    
  ) { }

  ngOnInit(): void {

    this.notesPublic = this.activatedRoute.snapshot.data['notesResolues'];
    this.category = this.activatedRoute.snapshot.params['category'];

  }

}
