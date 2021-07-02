import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { PublicNotesComponent } from './components/public-notes/public-notes.component';
import { UserNotesComponent } from './components/user-notes/user-notes.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { UserComposComponent } from './components/user-compos/user-compos.component';
import { DisplayCompoComponent } from './components/display-compo/display-compo.component';
import { UpdateCompoComponent } from './components/update-compo/update-compo.component';
import { CreateCompoComponent } from './components/create-compo/create-compo.component';


@NgModule({
  declarations: [
    CategoryComponent,
    PublicNotesComponent,
    UserNotesComponent,
    DisplayNoteComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    UserComposComponent,
    DisplayCompoComponent,
    UpdateCompoComponent,
    CreateCompoComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,

    // Import du module Shared
    SharedModule
  ]
})
export class NoteModule { }
