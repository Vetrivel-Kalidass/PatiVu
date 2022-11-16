import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniNavbarComponent } from './mini-navbar/mini-navbar.component';
import { MaterialModule } from '../material/material.module';
import { TaskListComponent } from './task-list/task-list.component';
import { MainActionsMenuComponent } from './main-actions-menu/main-actions-menu.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { ColorTwitterModule } from 'ngx-color/twitter';

@NgModule({
  declarations: [
    MiniNavbarComponent,
    TaskListComponent,
    MainActionsMenuComponent,
    CreateTaskComponent,
    CreateTagComponent,
    NoteListComponent,
    SideNavbarComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule,
    DragDropModule,
    ColorTwitterModule
  ],
  exports: [
    MiniNavbarComponent,
    TaskListComponent,
    MainActionsMenuComponent,
    CreateTaskComponent,
    NoteListComponent,
    SideNavbarComponent,
    SettingsComponent
  ]
})
export class SharedModule { }
