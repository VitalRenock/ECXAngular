import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './global/home/home.component';

// Déclaration des routes
const routes: Routes = [
  // Redirection par défaut
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', loadChildren: () => import ('./user/user.module').then(m => m.UserModule) },
  { path: 'note', loadChildren: () => import ('./note/note.module').then(m => m.NoteModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
