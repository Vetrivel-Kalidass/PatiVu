import { Injectable } from '@angular/core';
import { getAuth, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { EmailPasswordCredentials, UserAccount } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private _authUser = getAuth();

  constructor(
    private _fireAuth: AngularFireAuth, 
    private _fireStore: AngularFirestore
  ) { }

  get authUser(): User | null {
    return this._authUser.currentUser;
  }

  signInWithEmailPassword(data: EmailPasswordCredentials): Observable<Promise<any> | null> {
    return this.isUserWithEmailExists(data.email)
      .pipe(
        map(isExist => {
          if (!isExist) {
            return null;
          }
          else {
            return this._fireAuth
              .signInWithEmailAndPassword(data.email, data.password)
              .catch(error => {
                console.log(error);
              });
          }
        })
      )
  }

  isUserWithEmailExists(email: string): Observable<boolean> {
    return this._fireStore
      .doc<UserAccount>(`users/${email}`)
      .valueChanges()
      .pipe(map(userDoc => !!userDoc))
  }


}
