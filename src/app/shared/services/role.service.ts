import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  urlController : string = 'Role/'

  constructor(

    private httpClient : HttpClient

  ) { }

  getAll() : Observable<Role[]> {
    
    return this.httpClient.get<Role[]>(environment.urlApi + this.urlController + 'GetAll')
  }

}
