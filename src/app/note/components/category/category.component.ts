import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories : Category[] = []

  constructor(

    private categoryService : CategoryService,
    private router : Router

  ) { }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe(
      (c : Category[]) => { 
        this.categories = c;
      }
    );
  }

  navigateToCategory(category : string) {
    this.router.navigate(['note/public-notes/' + category])
  }

}
