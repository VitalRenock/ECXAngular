import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  menuList : NbMenuItem[] = []

  constructor(

    ) { }

  ngOnInit(): void {
    this.menuList = [
      {
        title: 'User', icon: 'people', children: [
          { link: '/user/login', title: 'Login', icon:'log-in' },
          { link: '/user/register', title: 'Register', icon:'save' }
        ]
      }
    ]
  }

}
