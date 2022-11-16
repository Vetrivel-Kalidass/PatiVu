import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CommonService {

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor( 
    private _snackBar: MatSnackBar
  ) {}

  get isLoading(): Observable<boolean> {
    return this._isLoading;
  }

  setLoadingStatus(value: boolean): void {
    this._isLoading.next(value);
  }

  /**
   * @param data MatSnackbar details parameter
   * @returns MatSnackbar open method
   */
  openSnackBar(data: { message: string, action: string, config?: MatSnackBarConfig }) {
    return this._snackBar.open(data.message, data.action, { duration: 3000, ...data.config});
  }

}
