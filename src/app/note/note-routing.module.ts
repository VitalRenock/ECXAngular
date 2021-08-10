import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompoResolver } from '../shared/tools/compo.resolver';
import { ComposResolver } from '../shared/tools/compos.resolver';
import { AuthGuard } from '../shared/tools/guards/auth.guard';
import { NoteResolver } from '../shared/tools/note.resolver';
import { NotesResolver } from '../shared/tools/notes.resolver';
import { CategoryComponent } from './components/category/category.component';
import { CreateCompoComponent } from './components/create-compo/create-compo.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { DisplayCompoComponent } from './components/display-compo/display-compo.component';
import { DisplayNoteComponent } from './components/display-note/display-note.component';
import { PublicNotesComponent } from './components/public-notes/public-notes.component';
import { UpdateCompoComponent } from './components/update-compo/update-compo.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { UserComposComponent } from './components/user-compos/user-compos.component';
import { UserNotesComponent } from './components/user-notes/user-notes.component';

const routes: Routes = [
  // J'ajoute un paramètre à ma route (ici nommé 'category')
  // J'ajoute un Resolver en fournissant comme valeur au paramètre 'resolve' un objet (ici nommé'notesResolues') qui sera remplis par le Resolver lors de la navigation
  { path: "", children: [
    
    // Note 
    // Routing Public
    { path: "category", component: CategoryComponent },
    { path: "public-notes/:categoryId", resolve: { notesResolues : NotesResolver }, component: PublicNotesComponent },
    { path: "display-note/:id", resolve: { noteResolue : NoteResolver }, component: DisplayNoteComponent },
    
    // Routing Privé
    { path: "create-note", canActivate: [AuthGuard], component : CreateNoteComponent },
    { path: "update-note/:id", canActivate: [AuthGuard], resolve: { noteResolue : NoteResolver }, component: UpdateNoteComponent },
    { path: "user-notes/:userId", canActivate: [AuthGuard], resolve:{ notesResolues : NotesResolver }, component: UserNotesComponent },
    
    // Compo Routing
    { path: "create-compo", canActivate: [AuthGuard], component : CreateCompoComponent },
    { path: "user-compos/:userId", canActivate: [AuthGuard], resolve: { composResolus : ComposResolver }, component: UserComposComponent },
    { path: "display-compo/:compoId", canActivate: [AuthGuard], resolve: { compoResolus : CompoResolver }, component: DisplayCompoComponent },
    { path: "update-compo/:compoId", canActivate: [AuthGuard], resolve: { compoResolus : CompoResolver }, component: UpdateCompoComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }

