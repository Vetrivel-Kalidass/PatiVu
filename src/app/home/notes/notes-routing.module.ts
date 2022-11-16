import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotesComponent } from './notes.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'create', component: CreateNoteComponent },
  { path: 'edit/:id', component: CreateNoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
