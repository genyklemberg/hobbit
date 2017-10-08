import { Component, OnInit, Input, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import { LoginDialogComponent } from '../modals/login-dialog/login-dialog.component';

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
    const dialogRef = this.dialog.open(LoginDialogComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
    });

  }

   logout() {
    this.isAuth = false;
    this.afAuth.auth.signOut().then((res) => {
       this.router.navigate(['/events']);
    }).catch((err) => {
       alert(err)
    })
  }

}
