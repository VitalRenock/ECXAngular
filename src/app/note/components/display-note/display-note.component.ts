import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Compo } from 'src/app/shared/models/compo';
import { Note } from 'src/app/shared/models/note';
import { User } from 'src/app/shared/models/user';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CompoService } from 'src/app/shared/services/compo.service';
import { NoteService } from 'src/app/shared/services/note.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  note : Note = {}
  noteCategory : string = ""
  compos : Compo[] = []
  previousRoute : string = ''
  currentUser : User = {}
  creator : User = {}
  composCreators : string[] = []
  composCategory : Category[] = []

  constructor(
    
    private activatedroute : ActivatedRoute,
    private compoService : CompoService,
    private noteService : NoteService,
    private userService : UserService,
    private categoryService : CategoryService,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.note = this.activatedroute.snapshot.data['noteResolue'];
    this.previousRoute = sessionStorage.getItem('previousRoute') ?? 'Error';

    // On va rechercher le créateur de la note
    this.userService.getUserById(this.note.user_Id!).subscribe(
      (u : User) => {
        this.creator = u;
      }
    )

    this.categoryService.getCategoryById(this.note.category_Id!).subscribe(
      (c : Category) => {
        this.noteCategory = c.short!;
      }
    )

    // On va rechercher les composants de ma note
    this.compoService.getComponentsByNote(this.note.id ?? 0).subscribe(
      (compoList : Compo[]) => {
        this.compos = compoList;


        this.test();
        // // Pour chaque compos...
        // for (let i = 0; i < this.compos.length; i++) {
        //   const element = this.compos[i];
          


        // }

      }
    );

    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();

  }

  deleteNote(id : number) {

    this.noteService.deleteNote(id).subscribe(
      () => {
        this.router.navigate(['note/user-notes/' + this.currentUser.id]);
      }
    )
  }

  async test() {

    for await (const iterator of this.compos) {

      // On va rechrcher le nom des créateurs des composants
      this.userService.getUserById(iterator.user_Id!).subscribe(
        (u : User) => {
          this.composCreators.push(u.nickname!);
        }
      );

      // On va rechercher les couleurs
      this.categoryService.getCategoryById(iterator.category_Id!).subscribe(
        (c : Category) => {
          this.composCategory.push(c);
        }
      );
      
    }
  }

}
