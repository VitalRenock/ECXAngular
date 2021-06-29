import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Déclaration d'un nouveau formulaire qui sera binder avec le formulaire HTML
  loginFG : FormGroup = this.fgBuilder.group({})

  constructor(

    // Injection d'un service User
    private userService : UserService,

    // Injection du FormBuilder pour binding avec le formulaire HTML
    private fgBuilder : FormBuilder,

    // Injection d'un Router pour rediriger l'utilisateur
    private router : Router

  ) { }

  ngOnInit(): void {

    // Initialisation du formulaire et de tout ses champs (voir avec les retours de l'API)
    this.loginFG = this.fgBuilder.group({
      emailControl: ['renaud@mail.com', Validators.required],
      passwordControl: ['test=1111', Validators.required]
    })

  }

  // Méthode appelée lors de la soumission du formulaire Login
  login() {

    this.userService.login(
      // On récupère les valeurs du formulaire et on les envoie en paramètres à la méthode 'Login' du 'UserService'
      this.loginFG.value['emailControl'],
      this.loginFG.value['passwordControl']
    ).subscribe(
      (userResponse : User) => {
        console.log(userResponse);
        this.router.navigate(['home']);
      }
      // (userResponse : User) => {
      //   // Sauvegarde du 'User' reçu dans le service 'User'
      //   this.userService.currentUser = userResponse
      //   console.log(userResponse)
      //   // Redirection vers le Composant 'Home'
      //   this.router.navigate(['home'])
      //  }
    )
  }

}