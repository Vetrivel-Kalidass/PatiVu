import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/core/note.service';
import { TagService } from 'src/app/core/tag.service';
import { FormType, NoteItem, TagItem } from 'src/app/models';
import { AppValues, TEXT_EDITOR_CONFIG } from 'src/app/shared/data';
import { Editor, Toolbar } from "ngx-editor";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  appValues = AppValues;
  formType: FormType = this.appValues.create;
  selectedNoteItem: NoteItem | null | undefined;
  noteItemForm!: FormGroup;
  descriptionEditor: Editor = new Editor();
  toolbar: Toolbar = TEXT_EDITOR_CONFIG;
  allTags$!: Observable<TagItem[] | null | undefined>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _noteService: NoteService,
    private _tagService: TagService,
  ) {
    this._activatedRoute.params.subscribe((params: Params) => {
      if (params['id']?.length) {
        this.selectedNoteItem = this._noteService.getNoteById(+params['id']);
        this.formType = this.appValues.edit;
      }
      this.createNoteItemForm(this.selectedNoteItem);
    });
   }

  ngOnInit(): void {
    this.allTags$ = this._tagService.allTags;
  }

  createNoteItemForm(noteItem: NoteItem | null = null) {
    this.noteItemForm = this._formBuilder.group({
      title: this._formBuilder.control(noteItem?.title),
      description: this._formBuilder.control(noteItem?.description || ''),
      tagId: this._formBuilder.control(noteItem?.tagId)
    });
  }

  submitForm() {
    if (this.noteItemForm.invalid || this.noteItemForm.pristine) return;
    if (!this.selectedNoteItem) {
      const newTask: NoteItem = {
        ...this.noteItemForm.value,
      };
      this._noteService.createNote(newTask);
    }
    else {
      const modifiedNote: NoteItem = {
        ...this.selectedNoteItem,
        ...this.noteItemForm.value,
      }
      this._noteService.editNote(modifiedNote);
    }
    this._router.navigate(['/home/notes']);
  }
  
  trackByFn(index: number, item: object): number { 
    return index; 
  }

}
