import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/role';
import { User } from 'src/app/shared/models/user';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.scss']
})
export class GetAllComponent implements OnInit {

  userList : User[] = [];
  roleList : Role[] = [];
  
  constructor(

    // Injection du service User
    private userService : UserService,
    private roleService : RoleService,
    private router : Router

  ) { }

  ngOnInit(): void {

    this.userService.getAll().subscribe(
      (users : User[]) => {
        this.userList = users
      }
    );

    this.roleService.getAll().subscribe(
      (roles : Role[]) => {
        this.roleList = roles
      }
    );

  }

  
  setRole(id : number, userId? : number,   roleName? : string) {

    let roleSelect = document.getElementById(id.toString())

    roleName = roleSelect?.innerText

    if (userId != null && userId != 0 && roleName != null) {

    }
    if (userId == null) {
      console.log("setRole() => userId ne peut être 'null'");
      return;
    }
    else if (userId == 0) {
      console.log("setRole() => userId ne peut être égal à zéro");
      return;
    }
    else if (roleName == null) {
      console.log("setRole() => roleName ne peut être 'null'");
      return;
    }

    this.userService.setRole(userId, roleName).subscribe(
      () => { 
        this.userService.getAll().subscribe(
          (users : User[]) => {
            this.userList = users;
          }
        );

       }
    );
  }

}