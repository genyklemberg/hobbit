import { Component, Inject} from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../constants';

import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'hb-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  providers: [Constants]
})
export class LoginDialogComponent {

  loginForm: FormGroup;
  isAuth: boolean = false;
  email: string;
  password: string;
  constructor(public dialog: MdDialog, public dialogRef: MdDialogRef<LoginDialogComponent>, public afAuth: AngularFireAuth, private fb: FormBuilder, @Inject(Router) private router: Router, public ERRORS: Constants){
    console.log(this.ERRORS);
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
        let errorCode = error.code;
        let errorMessage = error.message;

        alert(errorMessage);
        console.log(error);

      });
  }

  closeDialog() {
    console.log('working perfectly');
    this.dialogRef.close();
  }

}
