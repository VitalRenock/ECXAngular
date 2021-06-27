import { Component, OnInit } from '@angular/core';
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

  userList : User[] = []
  roleList : Role[] = []

  constructor(

    // Injection du service User
    private userService : UserService,
    private roleService : RoleService

  ) { }

  ngOnInit(): void {

    this.userService.getAll().subscribe(
      (users : User[]) => {
        this.userList = users
        console.log(users)
      }
    )

    this.roleService.getAll().subscribe(
      (roles : Role[]) => {
        this.roleList = roles
      }
    )

  }
  
  // TO DO
  // Essayer de faire une liste permettant de changer le role du user
  setRole(userId : number, roleName : string) {
    // this.userService.
  }

}
