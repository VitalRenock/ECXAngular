import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteResolver } from '../shared/tools/note.resolver';
import { NotesResolver } from '../shared/tools/notes.resolver';
import { CategoryComponent } from './components/category/category.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { PublicNotesComponent } from './components/public-notes/public-notes.component';
import { UserNotesComponent } from './components/user-notes/user-notes.component';

const routes: Routes = [
  { path: "", children: [
    { path: "category", component: CategoryComponent },
    // J'ajoute un paramètre à ma route (ici nommé 'category')
    // J'ajoute un Resolver en fournissant comme valeur au paramètre 'resolve' un objet (ici nommé'notesResolues') qui sera remplis par le Resolver lors de la navigation
    { path: "display-note/:id", resolve: { noteResolue : NoteResolver }, component: DisplayNoteComponent },
    { path: "public-notes/:category", resolve: { notesResolues : NotesResolver }, component: PublicNotesComponent },
    { path: "user-notes/:userId", resolve:{ notesResolues : NotesResolver }, component: UserNotesComponent },
    { path: "create-note", component : CreateNoteComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }

