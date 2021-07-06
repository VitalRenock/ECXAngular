import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Note } from 'src/app/shared/models/note';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-public-notes',
  templateUrl: './public-notes.component.html',
  styleUrls: ['./public-notes.component.scss']
})
export class PublicNotesComponent implements OnInit {

  notesPublic : Note[] = []
  category : Category = {}

  constructor(

    private activatedRoute : ActivatedRoute,
    private categoryService : CategoryService
    
  ) { }

  ngOnInit(): void {

    this.notesPublic = this.activatedRoute.snapshot.data['notesResolues'];

    this.categoryService.getCategoryById(this.activatedRoute.snapshot.params['categoryId']).subscribe(
      (c : Category) => {
        this.category = c;
      }
    )

  }

}
