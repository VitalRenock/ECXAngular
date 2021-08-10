import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compo } from '../models/compo';

@Injectable({
  providedIn: 'root'
})
export class CompoService {

  urlController : string = 'Component/'

  constructor(

    private httpClient : HttpClient,
    private formBuilder : FormBuilder

  ) { }

  //#region GET Methods

  getAllComponents() : Observable<Compo[]> {
    
    return this.httpClient.get<Compo[]>(environment.urlApi + this.urlController + 'GetAllComponents');
  }

  getAllUserComponents(id : number) : Observable<Compo[]> {
    
    return this.httpClient.get<Compo[]>(environment.urlApi + this.urlController + 'GetAllUserComponents/' + id);
  }

  getPublicUserComponents(id : number) : Observable<Compo[]> {
    
    return this.httpClient.get<Compo[]>(environment.urlApi + this.urlController + 'GetPublicUserComponents/' + id);
  }

  getComponentsByNote(noteId : number) : Observable<Compo[]> {
    
    return this.httpClient.get<Compo[]>(environment.urlApi + this.urlController + 'GetComponentsByNote/' + noteId);
  }

  getPublicComponentsByNote(noteId : number) : Observable<Compo[]> {
    
    return this.httpClient.get<Compo[]>(environment.urlApi + this.urlController + 'GetPublicComponentsByNote/' + noteId);
  }

  getUserComponent(compoId : number) : Observable<Compo> {
    
    return this.httpClient.get<Compo>(environment.urlApi + this.urlController + 'GetUserComponent/' + compoId);
  }

  //#endregion

//#region POST Methods

createCompo(newCompo : Compo) : Observable<number> {

  console.log(newCompo);
  return this.httpClient.post<number>(environment.urlApi + this.urlController + 'Create', newCompo);
}

addCompoToNote(noteId : number, compoId : number) : Observable<number> {

  let form = {
    noteId: noteId,
    compoId: compoId
  }

  return this.httpClient.post<number>(environment.urlApi + this.urlController + 'AddComponentToNote', form);
}

//#endregion

//#region PUT Methods

updateCompo(compo : Compo) {

  let form = {
    id: compo.id,
    title: compo.title,
    type: compo.type,
    content: compo.content,
    description: compo.description,
    url: compo.url,
    category_Id: compo.category_Id
  }

  return this.httpClient.put(environment.urlApi + this.urlController + 'Update', form);
}

setVisibility(id : number, isPublic : boolean) {

  let form = {
    id: id,
    isPublic: isPublic
  }
  
  return this.httpClient.put(environment.urlApi + this.urlController + 'SetVisibility', form);
}

switchComposOrder(noteId : number, compo1Id : number, compo2Id : number) {

  let form = {
    note_Id: noteId,
    component1_Id: compo1Id,
    component2_Id: compo2Id
  }

  return this.httpClient.put(environment.urlApi + this.urlController + 'SwitchComponentsOrder', form);
}

//#endregion

//#region DELETE Methods

deleteCompo(id : number) {

  return this.httpClient.delete(environment.urlApi + this.urlController + 'Delete/' + id);
}

removeComponentToNote(noteId: number,  componentId : number) {

  let params = new HttpParams();
  params.set('noteId', noteId);
  params.set('componentId', componentId);

  return this.httpClient.delete(environment.urlApi + this.urlController + 'RemoveComponentToNote', { params: params });
}

//#endregion
  
//#region HELPERS

getFormNewCompo() : FormGroup {
  return this.formBuilder.group(
    {
      titleCompoControl: [null, Validators.required],
      typeCompoControl: [null, Validators.required],
      contentControl: [null, Validators.required],
      descriptionControl: [null, Validators.required],
      urlControl: [null, Validators.required],
      isPublicControl: [null, Validators.required]
    }
  )
}

bindFormNewCompo(createCompoFG : FormGroup) : Compo {
  let newCompo : Compo = {};

  newCompo.title = createCompoFG.value['titleCompoControl'];
  newCompo.type = createCompoFG.value['typeCompoControl'];
  newCompo.content = createCompoFG.value['contentControl'];
  newCompo.description = createCompoFG.value['descriptionControl'];
  newCompo.url = createCompoFG.value['urlControl'];
  newCompo.isPublic = createCompoFG.value['isPublicControl'];

  return newCompo
}

//#endregion
}
