import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { User } from 'src/app/shared/models/user';
import { CompoService } from 'src/app/shared/services/compo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-compos',
  templateUrl: './user-compos.component.html',
  styleUrls: ['./user-compos.component.scss']
})
export class UserComposComponent implements OnInit {

  userCompos : Compo[] = []
  currentUser : User = {}

  constructor(

    private activatedRoute : ActivatedRoute,
    private userService : UserService,
    private compoService: CompoService

  ) { }

  ngOnInit(): void {

    this.userCompos = this.activatedRoute.snapshot.data['composResolus'];

    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();

  }

  deleteCompo(id : number) {

    this.compoService.deleteCompo(id).subscribe(
      () => {
        this.compoService.getAllUserComponents(this.currentUser.id ?? 0).subscribe(
          (c : Compo[]) => {
            this.userCompos = c;
          }
        )
      }
    )
  }

}
