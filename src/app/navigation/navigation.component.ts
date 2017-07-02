import { Component, OnInit, Input, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'hb-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
  isAuth: boolean = false;
  user: Observable<firebase.User>;
  // rout: Router;

  @Input()
  title: String;

  

  constructor(public dialog: MdDialog, public afAuth: AngularFireAuth,  @Inject(Router) private router: Router) {
  
    this.user = afAuth.authState;
    afAuth.authState.subscribe(res => {
      if (!res) {
        this.isAuth = false;        
        return;
      }
       this.isAuth = ! this.isAuth;
      console.log(res.email);
    });
   }
  
  openDialog() {
    let dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.isAuth = true;
    });
  }  

   logout() {

    this.afAuth.auth.signOut().then((res)=>{
       this.router.navigate(['/events']);
    }).catch((err)=>{
       alert(err)
    })
  } 
  
} 

// Dialog for logging 
@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialogComponent { 

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>, public afAuth: AngularFireAuth) {}

 login(email: string,  password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
      this.dialogRef.close(response);
      console.log('after auth', response);
    })
    .catch((error: firebase.FirebaseError) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}