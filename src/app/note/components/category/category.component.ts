import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories : string[] = []

  constructor(

    private noteService : NoteService,
    private router : Router

  ) { }

  ngOnInit(): void {

    this.noteService.getCategories().subscribe(
      (c : string[]) => { 
        this.categories = c;
      }
    );
  }

  navigateToCategory(category : string) {
    this.router.navigate(['note/public-notes/' + category])
  }

}
