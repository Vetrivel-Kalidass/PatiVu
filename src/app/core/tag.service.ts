import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagItem } from '../models';
import { AppValues } from '../shared/data';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TagService {

  private _allTags: BehaviorSubject<TagItem[] | null | undefined> = new BehaviorSubject<TagItem[] | null | undefined>(null);

  constructor(
    private _localStorageService: LocalStorageService
  ) {}

  get allTags(): Observable<TagItem[] | null | undefined> {
    if (!this._allTags.value) {
      this.setAllTags();
    }
    return this._allTags;
  }

  private setAllTags() {
    this._allTags.next(this._localStorageService.getLocalItem(AppValues.tags));
  }

  createTag(newTag: TagItem) {
    const currentTags: TagItem[] = this._localStorageService.getLocalItem(AppValues.tags) || [];
    let noOfTags: number | null = currentTags?.length;
    let uId: number = this._localStorageService.generateUId();
    if (currentTags.find(tag => tag.id === uId)) uId = this._localStorageService.generateUId();

    const newTags: TagItem[] = noOfTags ? [ ...currentTags, {  id: uId, ...newTag } ] : [ { id: uId, ...newTag } ];
    this._localStorageService.setLocalItem(AppValues.tags, newTags);
    this.setAllTags();
  }

  editTag(modifiedTag: TagItem) {
    const currentTags: TagItem[] = this._localStorageService.getLocalItem(AppValues.tags);
    let index = currentTags.findIndex(t => t.id === modifiedTag.id);

    const newTags: TagItem[] = currentTags?.length > 1 ? [
      ...currentTags.slice(0, index),
      modifiedTag,
      ...currentTags.slice(index + 1)
    ] : [ modifiedTag ];
    this._localStorageService.setLocalItem(AppValues.tags, newTags);
    this.setAllTags();
  }

  deleteTag(tag: TagItem) {
    const currentTags: TagItem[] = this._localStorageService.getLocalItem(AppValues.tags);

    const newTags: TagItem[] = currentTags.filter(t => t.id !== tag.id);
    this._localStorageService.setLocalItem(AppValues.tags, newTags);
    this.setAllTags();
  }

}
