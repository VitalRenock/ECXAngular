import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  menuList : NbMenuItem[] = []
  currentUser? : User

  constructor(

    private userService : UserService

    ) { }

  ngOnInit(): void {
    
    this.setMenu();

    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
        this.setMenu();
      }
    );
    
  }

  // Méthode pour définir le Menu Utilisateur en fonction du User dans le service
  setMenu() {

    if (this.currentUser != null) {
      this.menuList = [
        { link: '/user/get-all', title: 'Panneau Admin', icon:'people' }
      ];
    }
    else {
      this.menuList = [
        { link: '/user/login', title: 'Connexion', icon:'log-in' },
        { link: '/user/register', title: 'S\'enregister', icon:'save' }
      ];
    }

  }

  logout() {

    this.userService.logout();
  }

}