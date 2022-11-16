import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskServiceService } from 'src/app/core/task-service.service';
import { CheckListItem, TagItem, TaskItem } from 'src/app/models';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { AppValues } from '../data';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  
  @Input() allTasks: TaskItem[] = [];
  @Input() allTags: TagItem[] | null | undefined;

  focusedTasks: TaskItem[] = [];
  selectedTask: TaskItem | null | undefined;
  today!: string;
  indexExpanded: number = -1;

  constructor(
    private _taskService: TaskServiceService,
    private _matDialog: MatDialog
  ) {
    this.today = new Date().toLocaleDateString();
   }

  ngOnInit(): void {
  }
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getTagColor(tagId: number): string {
    return this.allTags?.find(tag => tag.id === tagId)?.color || AppValues.defaultTagColor;
  }

  togglePanels(index: number, description: string | undefined) {
    if (!description?.length) return;
    this.indexExpanded = index == this.indexExpanded ? -1 : index;
  }

  checkBoxChange(task: TaskItem) {
    this._taskService.editTask({ ...task, completed: !task.completed });
  }

  checklistChange(task: TaskItem, checkListItem: CheckListItem) {
    let modifiedList: CheckListItem[];
    if (!task?.checkList?.length) return;
    modifiedList = task?.checkList?.map(item => {
      if (item.id === checkListItem.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    let isTaskCompleted: boolean = modifiedList?.every(item => item.completed);
    this._taskService.editTask({ ...task, completed: isTaskCompleted, checkList: modifiedList });
  }

  editTask(task: TaskItem) {
    const dialogRef = this._matDialog.open(CreateTaskComponent, { panelClass: "full-view-dialog", data: task });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteTask(task: TaskItem) {
    this._taskService.deleteTask(task);
  }
  
  trackByFn(index: number, item: object): number { 
    return index; 
  }

}
