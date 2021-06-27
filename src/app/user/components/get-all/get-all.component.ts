import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  choice : string = "";

  fakeRoles : Role[] = 
  [
    {
      "id": 1,
      "name": "Administrateur",
      "color": "#333333",
      "description": "Responsable des Utilisateurs et Notes du site."
    },
    {
      "id": 2,
      "name": "Modérateur",
      "color": "#666666",
      "description": "En charge de la modération des Notes du site"
    },
    {
      "id": 3,
      "name": "Rédacteur",
      "color": "#999999",
      "description": "En charge de la rédaction des Notes du site"
    }
  ];

  fakeUsers : User[] =
  [
    {
      "id": 1,
      "email": "renaud@mail.com",
      "password": undefined,
      "nickname": "VitalRenock",
      "lastname": "Brigode",
      "firstname": "Renaud",
      "role": "Administrateur"
    },
    {
      "id": 2,
      "email": "mexojer@mail.com",
      "password": undefined,
      "nickname": "Mexojer",
      "lastname": "Thunus",
      "firstname": "Jérôme",
      "role": "Modérateur"
    },
    {
      "id": 3,
      "email": "momo@mail.com",
      "password": undefined,
      "nickname": "Momo",
      "lastname": "Lechat",
      "firstname": "Maurice",
      "role": "Rédacteur"
    }
  ];

  constructor(

    // Injection du service User
    private userService : UserService,
    private roleService : RoleService

  ) { }

  ngOnInit(): void {

    // this.userService.getAll().subscribe(
    //   (users : User[]) => {
    //     this.userList = users
    //     console.log(users)
    //   }
    // );

    // this.roleService.getAll().subscribe(
    //   (roles : Role[]) => {
    //     this.roleList = roles
    //   }
    // );

    this.roleList = this.fakeRoles;
    this.userList = this.fakeUsers;

  }
  
  setRole(userId? : number, roleName? : string) {

    if (userId != null && userId != 0 && roleName != null) {
    }
    if (userId == null) {
      console.log("setRole() => userId ne peut être 'null'");
      return;
    }
    else if (userId == 0) {
      console.log("setRole() =< userId ne peut être égal à zéro");
      return;
    }
    else if (roleName == null) {
      console.log("setRole() => roleName ne peut être 'null'");
      return;
    }

    // this.userService.setRole(userId, roleName);
    console.log(userId, roleName);

  }

}
