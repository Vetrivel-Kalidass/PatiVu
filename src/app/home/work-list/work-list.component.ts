import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { TagService } from 'src/app/core/tag.service';
import { TaskServiceService } from 'src/app/core/task-service.service';
import { TagItem, TaskItem } from 'src/app/models';
import { CreateTaskComponent } from 'src/app/shared/create-task/create-task.component';
import { AppValues } from 'src/app/shared/data';
import { SAMPLE_NOTES, SAMPLE_TAGS, SAMPLE_TASKS } from 'src/app/shared/data/sample.data';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit, OnDestroy {

  allTasks: TaskItem[] | null | undefined;
  filteredTasks: TaskItem[] = [];
  allTags$: Observable<TagItem[] | null | undefined>;
  searchInputValue: string = '';
  searchExpanded: boolean = false;
  tagFilterId: number = -1;

  tasksSubs$!: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _taskService: TaskServiceService,
    private _tagService: TagService,
    private _matDialog: MatDialog
  ) { 
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.tagFilterId = +params['tag'];
      this.fetchTasks();  
    });
    this.allTags$ = this._tagService.allTags;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.tasksSubs$) this.tasksSubs$.unsubscribe();
  }

  fetchTasks() {
    this.tasksSubs$ = this._taskService.allTasks.subscribe(tasks => {
      this.allTasks = !this.tagFilterId ? tasks : tasks?.filter(task => task.tagId === this.tagFilterId);
      this.filteredTasks = this.allTasks?.length ? this.allTasks : [];
    });
    if (!this.allTasks?.length) {
      this._taskService.sampleEntryNotify().onAction().subscribe(data => {
        localStorage.setItem(AppValues.tasks, JSON.stringify(SAMPLE_TASKS));
        localStorage.setItem(AppValues.notes, JSON.stringify(SAMPLE_NOTES));
        localStorage.setItem(AppValues.tags, JSON.stringify(SAMPLE_TAGS));
        location.reload();
      });
    }
  }

  createTask() {
    const dialogRef = this._matDialog.open(CreateTaskComponent, { panelClass: "full-view-dialog" });
  
    dialogRef.afterClosed().subscribe(result => {
      this.fetchTasks();
      console.log(`Dialog result: ${result}`);
    });
  }

  filterByCompleted() {
    if (!this.allTasks) return;
    this.filteredTasks = this.allTasks.filter(task => task.completed);
  }

  filterByInCompleted() {
    if (!this.allTasks) return;
    this.filteredTasks = this.allTasks.filter(task => !task.completed);
  }

  showAllTasks() {
    this.filteredTasks = this.allTasks?.length ? this.allTasks : [];
  }

  searchTaskBtnEvent() {
    this.searchExpanded = !this.searchExpanded;
    this.searchTask();
  }

  searchTask() {
    if (!this.allTasks) return;
    this.filteredTasks = this.allTasks.filter(task => 
        task.title.toLowerCase().includes(this.searchInputValue.toLowerCase()));
  }

}
