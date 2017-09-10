import { Component, OnInit } from '@angular/core';
import { ProfilePictureCropper } from './profile-picture-cropper/profile-picture-cropper';

@Component({
  selector: 'hb-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [ProfilePictureCropper]
})
export class MyProfileComponent implements OnInit {

  constructor(private profilePictureCropper: ProfilePictureCropper) { }

  ngOnInit() {
  }

  editAvatar() {
    this.profilePictureCropper
      .changeProfilePicture()
      .subscribe(result => console.log('Change avatar dialog', result));
  }
}
