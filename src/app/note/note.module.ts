import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { PublicNotesComponent } from './components/public-notes/public-notes.component';
import { UserNotesComponent } from './components/user-notes/user-notes.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';


@NgModule({
  declarations: [
    CategoryComponent,
    PublicNotesComponent,
    UserNotesComponent,
    DisplayNoteComponent,
    CreateNoteComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,

    // Import du module Shared
    SharedModule
  ]
})
export class NoteModule { }
