import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/core/tag.service';
import { TagItem } from 'src/app/models';
import { MainActionsMenuComponent } from '../main-actions-menu/main-actions-menu.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  allTags$!: Observable<TagItem[] | null | undefined>;

  constructor(
    private _tagService: TagService,
    private _bottomSheet: MatBottomSheet,
    private _matDialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.allTags$ = this._tagService.allTags;
  }

  openSettings() {
    const dialogRef = this._matDialog.open(SettingsComponent, { panelClass: "full-view-dialog" });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  openMainActionMenu(): void {
    this._bottomSheet.open(MainActionsMenuComponent, { panelClass: 'p-0' });
  }
  
  navigateTo(path: string) {
    this._router.navigate(['/home', path]);
  }
  
  trackByFn(index: number, item: object): number { 
    return index; 
  }

}
