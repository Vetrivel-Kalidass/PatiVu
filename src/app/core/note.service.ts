import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NoteItem } from '../models';
import { AppValues } from '../shared/data';
import { CommonService } from './common.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class NoteService {

  private _allNotes: BehaviorSubject<NoteItem[] | null | undefined> = new BehaviorSubject<NoteItem[] | null | undefined>(null);

  constructor(
    private _localStorageService: LocalStorageService,
    private _commonService: CommonService
  ) {}

  get allNotes(): Observable<NoteItem[] | null | undefined> {
    if (!this._allNotes.value) {
      this.setAllNotes();
    }
    return this._allNotes;
  }

  private setAllNotes() {
    this._allNotes.next(this._localStorageService.getLocalItem(AppValues.notes));
  }

  getNoteById(noteId: number): NoteItem | undefined {
    this.setAllNotes();
    return this._allNotes.value?.find(note => note.id === noteId);
  }

  createNote(newNote: NoteItem) {
    const currentNotes: NoteItem[] = this._localStorageService.getLocalItem(AppValues.notes) || [];
    let noOfNotes: number | null = currentNotes?.length;
    let uId: number = this._localStorageService.generateUId();
    if (currentNotes.find(note => note.id === uId)) uId = this._localStorageService.generateUId();

    newNote = {
      ...newNote,
      id: uId,
      createdAt: new Date().toISOString(),
    };
    const newNotes: NoteItem[] = noOfNotes ? [ ...currentNotes, newNote ] : [ newNote ];
    this._localStorageService.setLocalItem(AppValues.notes, newNotes);
    this.setAllNotes();
    this._commonService.openSnackBar({ message: "Note created!!", action: "", config: { duration: 3000 } });
  }

  editNote(modifiedNote: NoteItem) {
    const currentNotes: NoteItem[] = this._localStorageService.getLocalItem(AppValues.notes);
    let index = currentNotes.findIndex(t => t.id === modifiedNote.id);

    const newNotes: NoteItem[] = currentNotes?.length > 1 ? [
      ...currentNotes.slice(0, index),
      modifiedNote,
      ...currentNotes.slice(index + 1)
    ] : [ modifiedNote ];
    this._localStorageService.setLocalItem(AppValues.notes, newNotes);
    this.setAllNotes();
  }

  deleteNote(note: NoteItem) {
    const currentNotes: NoteItem[] = this._localStorageService.getLocalItem(AppValues.notes);

    const newNotes: NoteItem[] = currentNotes.filter(t => t.id !== note.id);
    this._localStorageService.setLocalItem(AppValues.notes, newNotes);
    this.setAllNotes();
  }

  sampleEntryNotify() {
    return this._commonService.openSnackBar({ message: "Do you want sample data to test?", action: "YES", config: { duration: 30000 } });
  }

}
