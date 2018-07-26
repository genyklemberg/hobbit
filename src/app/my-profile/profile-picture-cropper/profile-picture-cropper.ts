import {Injectable, Component, ViewChild} from '@angular/core';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import {MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class ProfilePictureCropper {
  public result: any;

  constructor(public dialog: MdDialog) {
  }

  public changeProfilePicture() {

    let dialogRef = this.dialog.open(PictureCropper);
    dialogRef.componentInstance.profileImage = '../../assets/placeholder.png';

    return dialogRef.afterClosed();
  }

}

@Component({
  selector: 'picture-cropper',
  styleUrls: ['profile-picture-cropper.scss'],
  template: `
<h2 md-dialog-title>Change profile picture</h2>
<div md-dialog-content>
  <div fxLayout="row" fxLayoutAlign="center start" class="picture-crop-block">
    <div fxFlex="65%">
      <p>Select image file:</p>
      <div class="crop-area">
        <img-cropper [image]="profileImageData" [settings]="cropperSettings" (onCrop)="cropped($event)"></img-cropper>
       </div>
      </div>
      <div fxFlex="35%" class="avatar-preview">
        <p>Preview:</p>
        <span class="result" *ngIf="profileImageData.image" >
          <img [src]="profileImageData.image"
               [width]="croppedWidth"
               [height]="croppedHeight">
        </span>
      </div>
    </div>
</div>
<div md-dialog-actions>
    <button type="button" md-raised-button color="primary"
            (click)="dialogRef.close(field.value)">Save</button>
    <button type="button" md-button 
        (click)="dialogRef.close()">Cancel</button>
</div>
  `
})


export class PictureCropper {
  public profileImage: string;
  public profileImageData: any;
  public cropperSettings: CropperSettings;
  public croppedWidth: number;
  public croppedHeight: number;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(public dialogRef: MdDialogRef<PictureCropper>) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;

    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;

    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 200;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.profileImageData = {};
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  updateProfilePicture(userId, profilePicture){
    // TODO implement updateUserPicture method
    // this.UserService.updateUserPicture(userId, profilePicture);
  }
}
