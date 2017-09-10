import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

@Injectable()
export class DialogsService {
  public result: any;

  constructor(public dialog: MdDialog) { }

  public alert(title: string, message: string) {
    let dialogRef = this.dialog.open(AlertDialog);
    return dialogRef.afterClosed();
  }

  public confirm(title: string, message: string) {

    let dialogRef: MdDialogRef<ConfirmDialog>;

    dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  /** Opens prompt dialog
   * @example  this.DialogsService
               .prompt('Prompt Dialog', 'Enter your name?', 'Name', 'text', '.{3,6}', true)
               .subscribe(result => console.log('Prompt Dialog111', result));
   */
  public prompt(title: string, message: string, placeholder: string, type: string, validation: string, required: boolean) {

    let dialogRef: MdDialogRef<PromptDialog>;

    dialogRef = this.dialog.open(PromptDialog);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.placeholder = placeholder;
    dialogRef.componentInstance.type = type;
    dialogRef.componentInstance.validation = validation;
    dialogRef.componentInstance.required = required;

    return dialogRef.afterClosed();
  }

}

@Component({
  selector: 'alert-dialog',
  template: `
<h2 md-dialog-title>{{ title }}</h2>
<div md-dialog-content>
        <p>{{ message }}</p>
</div>        
<div md-dialog-actions>
        <button type="button" md-raised-button color="primary"
            (click)="dialogRef.close(true)">OK</button>
</div>
    `,
})
export class AlertDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<AlertDialog>) {}
}

@Component({
  selector: 'confirm-dialog',
  template: `
<h2 md-dialog-title>{{ title }}</h2>
<div md-dialog-content>
        <p>{{ message }}</p>
</div>        
<div md-dialog-actions>
        <button type="button" md-raised-button color="primary"
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" md-button 
            (click)="dialogRef.close()">Cancel</button>
</div>
    `,
})
export class ConfirmDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {}
}

@Component({
  selector: 'prompt-dialog',
  template: `
<h2 md-dialog-title>{{ title }}</h2>
<div md-dialog-content>
  <p>{{ message }}</p>
    <div>
        <md-input-container>
            <input mdInput #field placeholder="{{ placeholder }}" type="{{ type }}" pattern="{{ validation }}" required="{{ required }}">
        </md-input-container>
    </div>
</div>
<div md-dialog-actions>
    <button type="button" md-raised-button color="primary"
            (click)="dialogRef.close(field.value)">OK</button>
    <button type="button" md-button 
        (click)="dialogRef.close()">Cancel</button>
</div>
  `
})
export class PromptDialog {

  public title: string;
  public message: string;
  public placeholder: string;
  public type: string;
  public validation: string;
  public required: boolean;

  constructor(public dialogRef: MdDialogRef<PromptDialog>) { }
}
