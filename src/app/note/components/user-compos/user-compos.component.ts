import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Compo } from 'src/app/shared/models/compo';
import { User } from 'src/app/shared/models/user';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CompoService } from 'src/app/shared/services/compo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-compos',
  templateUrl: './user-compos.component.html',
  styleUrls: ['./user-compos.component.scss']
})
export class UserComposComponent implements OnInit, OnDestroy {

  userCompos: Compo[] = []
  currentUser: User = {}
  sub: Subscription = new Subscription()
  categories : Category[] = []

  constructor(

    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private compoService: CompoService,
    private categoryService: CategoryService

  ) { }

  ngOnInit(): void {

    this.userCompos = this.activatedRoute.snapshot.data['composResolus'];

    this.sub = this.userService.currentUseSubject.subscribe(
      (u: User) => {
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

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  deleteCompo(id: number) {

    this.compoService.deleteCompo(id).subscribe(
      () => {
        this.compoService.getAllUserComponents(this.currentUser.id ?? 0).subscribe(
          (c: Compo[]) => {
            this.userCompos = c;
          }
        )
      }
    )
  }

  getCategoryName(category_Id : number) : string {

    return this.categories.find(c => c.id == category_Id)?.short!
  }

}
