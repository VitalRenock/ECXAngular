import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compo } from '../models/compo';

@Injectable({
  providedIn: 'root'
})
export class CompoService {

  urlController : string = 'Component/'

  constructor(

    private httpClient : HttpClient

  ) { }

  getComponentsByNote(noteId : number) : Observable<Compo[]> {
    
    return this.httpClient.get<Compo[]>(environment.urlApi + this.urlController + 'GetComponentsByNote/' + noteId);
  }

  

}
