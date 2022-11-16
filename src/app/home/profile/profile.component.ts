import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/theme.service';
import { SettingsComponent } from 'src/app/shared/settings/settings.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  isDarkMode!: boolean;
  darkModeSubs$: Subscription;

  constructor(
    private _matDialog: MatDialog,
    private _themeService: ThemeService
  ) { 
    this.darkModeSubs$ = this._themeService.currentTheme.subscribe(theme => this.isDarkMode = theme ? theme.selectedTheme.darkMode : false);
  }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this._themeService.toggleDarkMode();
  }

  openSettings() {
    const dialogRef = this._matDialog.open(SettingsComponent, { panelClass: "full-view-dialog" });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.darkModeSubs$.unsubscribe();
  }

}
