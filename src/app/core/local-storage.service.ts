import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  /**LOCAL STORAGE SERVICES */
  setLocalItem(name: string, value: any): void {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getLocalItem(name: string): any {
    try {
      let stringifiedData: string | null = localStorage.getItem(name);
      return stringifiedData ? JSON.parse(stringifiedData) : null;
    }
    catch(e) {
      return null;
    }
  }

  removeLocalItem(name: string): void {
    localStorage.removeItem(name);
  }

  clearAllLocalItems(): void {
    localStorage.clear();
  }

  generateUId(): number {
    return Math.floor(Math.random() * 100000);
  }

}
