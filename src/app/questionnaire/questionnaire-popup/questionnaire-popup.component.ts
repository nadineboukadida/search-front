import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  amount: any;
  condition: any;
  country: any;
  distance: any;
}

@Component({
  selector: 'app-questionnaire-popup',
  templateUrl: './questionnaire-popup.component.html',
  styleUrls: ['./questionnaire-popup.component.css']
})
export class QuestionnairePopupComponent {

  constructor(
    public dialogRef: MatDialogRef<QuestionnairePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  getPhrasing = () => {
    if (this.data.country) {
      return `There are ${this.data.amount} treatment options for ${this.data.condition} in ${this.data.country}.`
    } else if (this.data.distance) {
      return `There are ${this.data.amount} treatment options for ${this.data.condition} within ${this.data.distance / 1000} kilometers from your current location.`
    } else {
      return `There are ${this.data.amount} treatment options for ${this.data.condition} worldwide.`
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
