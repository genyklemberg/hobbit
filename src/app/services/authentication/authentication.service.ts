import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }

  loginWithEmailAndPassword(email: string,  password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuthorized(): Observable<boolean> {
    return new Observable(observer => {
          this.user.subscribe((user) => {
            let isAuthorized: boolean = user !== null ;

            observer.next(isAuthorized);
            observer.complete();
          }) 
          
    });
  }
}
