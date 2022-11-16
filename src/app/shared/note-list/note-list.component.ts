import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/core/note.service';
import { NoteItem, TagItem } from 'src/app/models';
import { AppValues } from '../data';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  @Input() allNotes: NoteItem[] = [];
  @Input() allTags: TagItem[] | null | undefined;

  indexExpanded: number = -1;

  constructor(
    private _router: Router,
    private _NoteService: NoteService,
  ) {}
   
  togglePanels(index: number, description: string | undefined) {
    if (!description?.length) return;
    this.indexExpanded = index == this.indexExpanded ? -1 : index;
  }

  getTagColor(tagId: number): string {
    return this.allTags?.find(tag => tag.id === tagId)?.color || AppValues.defaultTagColor;
  }

  ngOnInit(): void {
  }

  editNote(note: NoteItem) {
    this._router.navigate(['/home/notes/edit', note.id]);
  }

  deleteNote(note: NoteItem) {
    this._NoteService.deleteNote(note);
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.allNotes, event.previousIndex, event.currentIndex);
  }

  trackByFn(index: number, item: object): number { 
    return index; 
  }

}