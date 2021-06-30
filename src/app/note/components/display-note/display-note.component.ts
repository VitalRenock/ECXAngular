import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { Note } from 'src/app/shared/models/note';
import { CompoService } from 'src/app/shared/services/compo.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  note : Note = {}
  compos : Compo[] = []
  previousRoute : string = ''

  constructor(
    
    private activatedroute : ActivatedRoute,
    private compoService : CompoService

  ) { }

  ngOnInit(): void {

    this.note = this.activatedroute.snapshot.data['noteResolue'];
    this.previousRoute = sessionStorage.getItem('previousRoute') ?? 'Error';

    this.compoService.getComponentsByNote(this.note.id ?? 0).subscribe(
      (compoList : Compo[]) => {
        this.compos = compoList;
      }
    );

  }

}
