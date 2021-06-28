import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { PublicNotesComponent } from './components/public-notes/public-notes.component';


@NgModule({
  declarations: [
    CategoryComponent,
    PublicNotesComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,

    // Import du module Shared
    SharedModule
  ]
})
export class NoteModule { }
