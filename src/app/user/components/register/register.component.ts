import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFG : FormGroup = this.builder.group({});

  constructor(
    private builder : FormBuilder,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    
    // Initialisation du formulaire
    this.registerFG = this.builder.group({
      emailControl: [null, Validators.required],
      passwordControl: [null, Validators.required],
      nicknameControl: [null, Validators.required],
      lastnameControl: [null, Validators.required],
      firstnameControl: [null, Validators.required],
    });
  }

  register() {
    // Bindings des valeurs du formulaire dans un utilisateur
    let newUser : User = {
      email: this.registerFG.value['emailControl'],
      password: this.registerFG.value['passwordControl'],
      nickname: this.registerFG.value['nicknameControl'],
      lastname: this.registerFG.value['lastnameControl'],
      firstname: this.registerFG.value['firstnameControl'],
      role: 'Rédacteur'
    }

    this.userService.register(newUser);
  }

}
