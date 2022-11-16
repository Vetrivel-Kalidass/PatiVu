import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/core/tag.service';
import { TaskServiceService } from 'src/app/core/task-service.service';
import { CheckListItem, FormType, TagItem, TaskItem } from 'src/app/models';
import { AppValues } from '../data';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  appValues = AppValues;
  formType: FormType = this.appValues.create;
  selectedTaskItem: TaskItem | null | undefined;
  taskItemForm!: FormGroup;
  checkLists: CheckListItem[] = [];
  allTags$!: Observable<TagItem[] | null | undefined>;

  currentCheckListDesc: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TaskItem | null | undefined,
    private _matDialogRef: MatDialogRef<CreateTaskComponent>,
    private _formBuilder: FormBuilder,
    private _taskService: TaskServiceService,
    private _tagService: TagService,
  ) {
    this.selectedTaskItem = this.data ? { ...this.data } : null;
    this.checkLists = this.data?.checkList ? [ ...this.data.checkList ] : [];
    if (this.data) this.formType = this.appValues.edit;
    this.createTaskItemForm(this.selectedTaskItem);
   }

  ngOnInit(): void {
    this.allTags$ = this._tagService.allTags;
  }

  ngOnDestroy(): void {
      if (this.taskItemForm.dirty) this.submitForm();
  }

  toggleCheckList() {
    this.taskItemForm.patchValue({ checkListType: !this.isCheckList });
  }

  changeCheckListItem(listItem: CheckListItem) {
    this.checkLists = this.checkLists.map(item => {
      if (item.id === listItem.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
  }

  removeCheckItem(listItem: CheckListItem) {
    this.checkLists = this.checkLists.filter(item => item.id !== listItem.id);
  }

  createTaskItemForm(taskItem: TaskItem | null = null) {
    this.taskItemForm = this._formBuilder.group({
      title: this._formBuilder.control(taskItem?.title),
      description: this._formBuilder.control(taskItem?.description),
      dueDate: this._formBuilder.control(taskItem?.dueDate),
      completed: this._formBuilder.control(taskItem?.completed),
      tagId: this._formBuilder.control(taskItem?.tagId),
      checkListType: this._formBuilder.control(taskItem?.checkListType)
    });
  }

  get isCheckList(): boolean {
    return this.taskItemForm.get('checkListType')?.value;
  }

  get dueDateString(): string {
    const value = this.taskItemForm.get('dueDate')?.value;
    return value ? new Date(value).toISOString() : '';
  }

  addCheckList() {
    if (!this.currentCheckListDesc) return;

    const newList: CheckListItem = {
      id: this.checkLists?.length ? this.checkLists.length + 1 : 1,
      description: this.currentCheckListDesc,
      completed: false
    };
    this.checkLists?.push(newList);
    this.currentCheckListDesc = null;
  }

  submitForm() {
    if (this.taskItemForm.invalid || this.taskItemForm.pristine) return;
    if (!this.selectedTaskItem) {
      const newTask: TaskItem = {
        ...this.taskItemForm.value,
        dueDate: this.dueDateString,
        checkList: this.checkLists
      };
      this._taskService.createTask(newTask);
    }
    else {
      const modifiedTask: TaskItem = {
        ...this.selectedTaskItem,
        ...this.taskItemForm.value,
        checkList: this.checkLists
      }
      this._taskService.editTask(modifiedTask);
    }
    this.taskItemForm.reset();
    this._matDialogRef.close();
  }

  cancel() {
    this.taskItemForm.reset();
    this._matDialogRef.close();
  }
  
  trackByFn(index: number, item: object): number { 
    return index; 
  }

}
