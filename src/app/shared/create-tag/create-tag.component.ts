import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagService } from 'src/app/core/tag.service';
import { FormType, TagItem } from 'src/app/models';
import { AppValues, COLORS } from '../data';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit, OnDestroy {

  appValues = AppValues;
  formType: FormType = this.appValues.create;
  selectedTagItem: TagItem | null | undefined;
  tagItemForm!: FormGroup;
  defaultColors: string[] = COLORS;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TagItem | null | undefined,
    private _matDialogRef: MatDialogRef<CreateTagComponent>,
    private _formBuilder: FormBuilder,
    private _tagService: TagService
  ) {
    this.selectedTagItem = this.data ? { ...this.data } : null;
    if (this.data) this.formType = this.appValues.edit;
    this.createTagItemForm(this.selectedTagItem);
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      if (this.tagItemForm.dirty) this.submitForm();
  }

  createTagItemForm(tagItem: TagItem | null = null) {
    this.tagItemForm = this._formBuilder.group({
      title: this._formBuilder.control(tagItem?.title),
      description: this._formBuilder.control(tagItem?.description),
      color: this._formBuilder.control(tagItem?.color || "#000000"),
    });
  }

  submitForm() {
    if (this.tagItemForm.invalid || this.tagItemForm.pristine) return;
    if (!this.selectedTagItem) {
      this._tagService.createTag(this.tagItemForm.value);
    }
    else {
      const modifiedTag: TagItem = {
        ...this.selectedTagItem,
        ...this.tagItemForm.value
      }
      this._tagService.editTag(modifiedTag);
    }
    this.tagItemForm.reset();
    this._matDialogRef.close();
  }

  cancel() {
    this.tagItemForm.reset();
    this._matDialogRef.close();
  }
  
  handleChangeColor($event: ColorEvent) {
    this.patchColor($event.color.hex);
  }

  get currentColor() {
    return this.tagItemForm.get('color')?.value;
  }

  patchColor(e: string) {
    this.tagItemForm.patchValue({ color: e });
  }

}
