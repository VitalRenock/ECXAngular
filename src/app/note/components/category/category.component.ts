import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories : string[] = []

  constructor(

    private noteService : NoteService

  ) { }

  ngOnInit(): void {

    this.noteService.getCategories().subscribe(
      (c : string[]) => { 
        this.categories = c;
      }
    );

  }

}
