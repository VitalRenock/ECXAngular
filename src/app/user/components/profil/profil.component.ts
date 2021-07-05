import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  currentUser : User = {}
  sub : Subscription = new Subscription()
  updateUserFG : FormGroup = this.builder.group({});

  constructor(

    private userService : UserService,
    private builder : FormBuilder

  ) { }
  
  ngOnInit(): void {

    this.sub = this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();

    this.updateUserFG = this.builder.group({
      nicknameControl: [this.currentUser.nickname, Validators.required],
      lastnameControl: [this.currentUser.lastname, Validators.required],
      firstnameControl: [this.currentUser.firstname, Validators.required]
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  updateUser() {

    let user : User = {
      id: this.currentUser.id,
      nickname: this.updateUserFG.value['nicknameControl'],
      lastname: this.updateUserFG.value['lastnameControl'],
      firstname: this.updateUserFG.value['firstnameControl'],
    }

    this.userService.updateUser(user);
    this.userService.emitUser();
    // this.userService.updateUser(user).subscribe(
    //   (result : boolean) => {
    //     console.log(result);
    //   }
    // );
    // this.userService.emitUser();

  }
}
