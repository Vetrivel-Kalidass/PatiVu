import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { TagService } from './tag.service';
import { TaskServiceService } from './task-service.service';
import { NoteService } from './note.service';
import { CommonService } from './common.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LocalStorageService,
    TaskServiceService,
    TagService,
    NoteService,
    CommonService
  ]
})
export class CoreModule { }
