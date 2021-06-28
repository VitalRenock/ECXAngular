import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { PublicNotesComponent } from './components/public-notes/public-notes.component';

const routes: Routes = [
  { path: "", children: [
    { path: "category", component: CategoryComponent },
    { path: "public-notes", component: PublicNotesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
