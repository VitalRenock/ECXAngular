import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { PublicNotesComponent } from './components/public-notes/public-notes.component';
import { PublicNoteComponent } from './components/public-note/public-note.component';
import { UserNotesComponent } from './components/user-notes/user-notes.component';


@NgModule({
  declarations: [
    CategoryComponent,
    PublicNotesComponent,
    PublicNoteComponent,
    UserNotesComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,

    // Import du module Shared
    SharedModule
  ]
})
export class NoteModule { }
