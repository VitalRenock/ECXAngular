import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compo } from 'src/app/shared/models/compo';
import { User } from 'src/app/shared/models/user';
import { CompoService } from 'src/app/shared/services/compo.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-display-compo',
  templateUrl: './display-compo.component.html',
  styleUrls: ['./display-compo.component.scss']
})
export class DisplayCompoComponent implements OnInit {

  compo : Compo = {}
  previousRoute : string = ''
  currentUser : User = {}


  constructor(

    private activatedroute : ActivatedRoute,
    private compoService : CompoService,
    private userService : UserService,
    private router : Router

  ) { }

  ngOnInit(): void {

    this.compo = this.activatedroute.snapshot.data['compoResolus'];
    this.previousRoute = sessionStorage.getItem('previousRoute') ?? 'Error';

    // Je vais rechercher mon Utilisateur
    this.userService.currentUseSubject.subscribe(
      (u : User) => {
        this.currentUser = u;
      }
    );
    this.userService.emitUser();
  }

}
