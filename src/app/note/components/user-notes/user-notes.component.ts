import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { CategoryService } from 'src/app/shared/services/category.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit, OnDestroy {

  userNotes : Note[]= []
  currentUser : User = {}
  sub : Subscription = new Subscription()
  categories : Category[] = []


  constructor(

    private activatedRoute : ActivatedRoute,
    private userService : UserService,
    private noteService : NoteService,
    private categoryService : CategoryService

  ) { }


  ngOnInit(): void {

    this.userNotes = this.activatedRoute.snapshot.data['notesResolues'];
    
    this.sub = this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();

    // On va rechercher toutes les Categories
    this.categoryService.getAllCategories().subscribe(
      (c : Category[]) => { 
        this.categories = c;
      }
    );

  }

  deleteNote(id : number) {

    this.noteService.deleteNote(id).subscribe(
      () => {
        this.noteService.getAllUserNotes(this.currentUser.id ?? 0).subscribe(
          (n : Note[]) => {
            this.userNotes = n;
          }
        )
      }
    )
  }

  getCategoryName(category_Id : number) : string {

    return this.categories.find(c => c.id == category_Id)?.short!
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
