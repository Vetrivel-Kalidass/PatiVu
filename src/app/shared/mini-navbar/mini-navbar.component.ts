import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { MainActionsMenuComponent } from '../main-actions-menu/main-actions-menu.component';

@Component({
  selector: 'app-mini-navbar',
  templateUrl: './mini-navbar.component.html',
  styleUrls: ['./mini-navbar.component.css']
})
export class MiniNavbarComponent implements OnInit {

  prevScrollPosition: number = window.pageYOffset;
  constructor(
    private _bottomSheet: MatBottomSheet,
    private _router: Router
  ) {}

  openMainActionMenu(): void {
    this._bottomSheet.open(MainActionsMenuComponent, { panelClass: 'p-0' });
  }

  ngOnInit(): void {
    window.addEventListener("scroll", () => {
      const miniNavbar = document.querySelector("mat-toolbar.miniNavbar");
      let currentScrollPosition = window.pageYOffset;
      miniNavbar?.classList.toggle("hide", ((this.prevScrollPosition < window.scrollY)));
      this.prevScrollPosition = currentScrollPosition;
    });
  }

  navigateTo(path: string) {
    this._router.navigate(['home', path]);
  }

}
