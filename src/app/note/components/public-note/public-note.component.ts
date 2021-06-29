import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { Note } from 'src/app/shared/models/note';
import { CompoService } from 'src/app/shared/services/compo.service';

@Component({
  selector: 'app-public-note',
  templateUrl: './public-note.component.html',
  styleUrls: ['./public-note.component.scss']
})
export class PublicNoteComponent implements OnInit {

  note : Note = {}
  compos : Compo[] = []

  constructor(
    
    private activatedroute : ActivatedRoute,
    private compoService : CompoService

  ) { }

  ngOnInit(): void {

    this.note = this.activatedroute.snapshot.data['noteResolue'];

    this.compoService.getComponentsByNote(this.note.id ?? 0).subscribe(
      (compoList : Compo[]) => {
        this.compos = compoList;
      }
    )
  }

}
