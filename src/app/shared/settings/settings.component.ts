import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { ThemeService } from 'src/app/core/theme.service';
import { Theme, ThemeData } from 'src/app/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentThemeData$: Observable<ThemeData>;
  selectedTheme!: Theme;

  constructor(
    private _matDialogRef: MatDialogRef<SettingsComponent>,
    private _themeService: ThemeService
  ) {
    this.currentThemeData$ = this._themeService.currentTheme.pipe(
      tap(themeData => this.selectedTheme = themeData.selectedTheme));
   }

  ngOnInit(): void {
  }

  toggleDarkModeTheme() {
    this._themeService.toggleDarkMode();
  }

  selectTheme(theme: Theme) {
    this.selectedTheme = theme;
    this._themeService.selectTheme(theme);
  }

  closeSettings() {
    this._matDialogRef.close();
  }

  trackByFn(index: number, item: object): number { 
    return index; 
  }

}
