export interface ColorPaletteItem {
  name: string;
  hex: string;
  darkContrast: boolean;
}

export interface Theme {
  name: string;
  keyValue: string;
  primary: string;
  accent: string;
  darkMode: boolean;
}

export interface ColorItem {
  name: string;
  hex: string;
  darkContrast: boolean;
}

export interface ThemeData {
  selectedTheme: Theme;
  availableThemes: Theme[];
}