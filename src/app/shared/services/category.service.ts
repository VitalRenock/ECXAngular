import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlController : string = 'Category/'

  constructor(

    private httpClient : HttpClient

  ) { }

  
  //#region GET Methods
  
  getCategoryById(id : number) : Observable<Category> {

    return this.httpClient.get<Category>(environment.urlApi + this.urlController + 'GetCategoryById/' + id);
  }

  getAllCategories() : Observable<Category[]> {

    return this.httpClient.get<Category[]>(environment.urlApi + this.urlController + 'GetAllCategories');
  }

  //#endregion

  //#region POST Methods

  createCategory(category : Category) : Observable<number> {

    return this.httpClient.post<number>(environment.urlApi + this.urlController + 'CreateCategory', category);
  }

  //#endregion

  //#region PUT Methods

  updateCategory(category : Category) {

    this.httpClient.put(environment.urlApi + this.urlController + 'UpdateCategory', category);
  }

  //#endregion

  //#region DELETE Methods

  deleteCategory(id : number) {

    this.httpClient.delete(environment.urlApi + this.urlController + 'DeleteCategory/' + id);
  }

  //#endregion

}
