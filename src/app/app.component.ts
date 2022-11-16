import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'development-planner';
  darkModeSubs$: Subscription;

  constructor(
    private _themeService: ThemeService
  ) {
    this.darkModeSubs$ = this._themeService.currentTheme.subscribe();
    window.addEventListener("scroll", () => {
      const header = document.querySelector("mat-toolbar.top-bar");
      header?.classList.toggle("shrink", (window.scrollY !== 0));
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.darkModeSubs$.unsubscribe();
  }

}