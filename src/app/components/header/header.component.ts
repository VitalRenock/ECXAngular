import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuList : NbMenuItem[] = []
  currentUser : User = {}
  
  constructor(

    private userService : UserService

  ) { }

  ngOnInit(): void {

    // souscription à mon user
    this.userService.currentUser.subscribe(
      (u : User) => {
        this.currentUser = u;
        console.log(this.currentUser);
      }
    );

    // this.menuList = [
    //   {
    //     title: 'User', icon: 'people', children: [
    //       { link: '/user/login', title: 'Connexion', icon:'log-in' },
    //       { link: '/user/register', title: 'S\'enregister', icon:'save' },
    //       { link: '/user/get-all', title: 'Utilisateurs', icon:'people' },
    //     ]
    //   }
    // ]

  }

}
