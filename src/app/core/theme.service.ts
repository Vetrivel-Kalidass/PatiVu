import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { TinyColor } from '@ctrl/tinycolor';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme, ColorItem, ThemeData } from '../models';
import { AppValues, DP_THEMES } from '../shared/data';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  _currentTheme: BehaviorSubject<ThemeData> = new BehaviorSubject<ThemeData>(DP_THEMES);
  primaryColorPalette: ColorItem[] = [];
  accentColorPalette: ColorItem[] = [];

  constructor(
    private _localStorageService: LocalStorageService,
    private _overlay: OverlayContainer
  ) { 
    this.fetchThemeData();
  }

  get currentTheme(): Observable<ThemeData> {
    if (!this._currentTheme.value) {
      this.fetchThemeData();
    }
    return this._currentTheme;
  }

  selectTheme(theme: Theme) {
    const newTheme: ThemeData = {
      selectedTheme: theme,
      availableThemes: this._currentTheme.value.availableThemes || DP_THEMES.availableThemes,
    }
    this._localStorageService.setLocalItem(AppValues.themes, newTheme);
    this.fetchThemeData();
    this.setThemeData(theme);
  }

  toggleDarkMode(): void {
    const toggledTheme: Theme = { 
      ...this._currentTheme.value.selectedTheme, 
      darkMode: !this._currentTheme.value.selectedTheme.darkMode
    };
    this.editTheme(toggledTheme);
  }

  createTheme(theme: Theme) {
    const newThemelist: Theme[] = [
      ...this._currentTheme.value.availableThemes,
      theme,
    ];
    const newThemeData: ThemeData = {
      selectedTheme: theme,
      availableThemes: newThemelist
    };
    this._localStorageService.setLocalItem(AppValues.themes, newThemeData);
    this.fetchThemeData();
  }

  editTheme(theme: Theme) {
    let index = this._currentTheme.value.availableThemes.findIndex(t => t.name === theme.name);
    const modifiedThemes: Theme[] = [
      ...this._currentTheme.value.availableThemes.slice(0, index),
      theme,
      ...this._currentTheme.value.availableThemes.slice(index + 1)
    ];
    const modifiedThemeData: ThemeData = {
      selectedTheme: theme,
      availableThemes: modifiedThemes
    };
    this._localStorageService.setLocalItem(AppValues.themes, modifiedThemeData);
    this.fetchThemeData();
  }

  deleteTheme(theme: Theme) {
    const modifiedThemes: Theme[] = this._currentTheme.value.availableThemes.filter(t => t.name !== theme.name);
    const modifiedThemeData: ThemeData = {
      selectedTheme: this._currentTheme.value.selectedTheme,
      availableThemes: modifiedThemes
    };
    this._localStorageService.setLocalItem(AppValues.themes, modifiedThemeData);
    this.fetchThemeData();
  }

  private fetchThemeData() {
    let avlThemes: ThemeData | undefined = this._localStorageService.getLocalItem(AppValues.themes);
    if (!avlThemes) {
      this._localStorageService.setLocalItem(AppValues.themes, DP_THEMES);
      avlThemes = DP_THEMES;
    }
    this._currentTheme.next(avlThemes);
    this.setThemeData(avlThemes.selectedTheme);
  }

  setThemeData(themeData: Theme) {
    this.primaryColorPalette = computeColors(themeData.primary);
    updateTheme(this.primaryColorPalette, 'primary');
    this.accentColorPalette = computeColors(themeData.accent);
    updateTheme(this.accentColorPalette, 'accent');
    this.applyTheme(themeData);
  }

  applyTheme(theme: Theme) {
    const bodyEle = document.querySelector("body");
    if (theme.darkMode) {
      bodyEle?.classList.add(AppValues.darkMode);
      this._overlay.getContainerElement().classList.add(AppValues.darkMode);
    }
    else {
      bodyEle?.classList.remove(AppValues.darkMode);
      this._overlay.getContainerElement().classList.remove(AppValues.darkMode);
    }
  }

}

function updateTheme(colors: ColorItem[], theme: string) {
  colors.forEach(color => {
      document.documentElement.style.setProperty(
        `--theme-${theme}-${color.name}`,
        color.hex
      );
      document.documentElement.style.setProperty(
        `--theme-${theme}-contrast-${color.name}`,
        color.darkContrast ? 'rgba(0, 0, 0, 0.87)' : '#fff'
      );
    });
}

function computeColors(hex: string): ColorItem[] {
  return [
    getColorObject(new TinyColor(hex).lighten(52), '50'),
    getColorObject(new TinyColor(hex).lighten(37), '100'),
    getColorObject(new TinyColor(hex).lighten(26), '200'),
    getColorObject(new TinyColor(hex).lighten(12), '300'),
    getColorObject(new TinyColor(hex).lighten(6), '400'),
    getColorObject(new TinyColor(hex), '500'),
    getColorObject(new TinyColor(hex).darken(6), '600'),
    getColorObject(new TinyColor(hex).darken(12), '700'),
    getColorObject(new TinyColor(hex).darken(18), '800'),
    getColorObject(new TinyColor(hex).darken(24), '900'),
    getColorObject(new TinyColor(hex).lighten(50).saturate(30), 'A100'),
    getColorObject(new TinyColor(hex).lighten(30).saturate(30), 'A200'),
    getColorObject(new TinyColor(hex).lighten(10).saturate(15), 'A400'),
    getColorObject(new TinyColor(hex).lighten(5).saturate(5), 'A700')
  ];
}

function getColorObject(value: any, name: any): ColorItem {
  const c = new TinyColor(value);
  var color = new TinyColor(c.toNumber());
  return {
    name: name,
    hex: c.toHexString(),
    darkContrast: color.isLight()
  };
}