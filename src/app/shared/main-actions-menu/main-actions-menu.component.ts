import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateTagComponent } from '../create-tag/create-tag.component';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-main-actions-menu',
  templateUrl: './main-actions-menu.component.html',
  styleUrls: ['./main-actions-menu.component.css']
})
export class MainActionsMenuComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MainActionsMenuComponent>,
    private _matDialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
  }

  createTask() {
    const dialogRef = this._matDialog.open(CreateTaskComponent, { panelClass: "full-view-dialog" });
    this._bottomSheetRef.dismiss();
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  createTag() {
    const dialogRef = this._matDialog.open(CreateTagComponent, { panelClass: "full-view-dialog" });
    this._bottomSheetRef.dismiss();
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateTo(path: string) {
    this._router.navigateByUrl(`/home/${path}`)
      .then(() => this._bottomSheetRef.dismiss());
  }

  click() {
    this._bottomSheetRef.dismiss();
  }

}
