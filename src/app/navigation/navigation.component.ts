import { Component, OnInit, Input, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Constants }  from '../constants'

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
    this.isAuth = false;
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
  providers: [Constants]
})
export class LoginDialogComponent { 
  
  loginForm: FormGroup;
  email: string;
  password: string;
  constructor(public dialog: MdDialog, public dialogRef: MdDialogRef<LoginDialogComponent>, public afAuth: AngularFireAuth, private fb: FormBuilder, public ERRORS: Constants){
      console.log(this.ERRORS)
    this.loginForm =fb.group( 
      {
        'email': ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9]).)+[a-z0-9]{2}(?:[a-z0-9-]*[a-z0-9])?")])],
        'password': ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern("(?=.*[a-z])(?=.*[A-Z]).{8,}")])]
      } 
    );
  }
  loginPost(post) {
    this.password = post.password;
    this.email = post.email;
    this.login(this.email, this.password)
    console.log(this.password, this.email)
  }
 login(email: string,  password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
      this.dialogRef.close(response);
      console.log('after auth', response);
    })
    .catch((error: firebase.FirebaseError) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      alert(errorMessage);
      console.log(error);
    });
  }
}
