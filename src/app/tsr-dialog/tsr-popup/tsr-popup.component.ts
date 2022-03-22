import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';

export interface DialogData {
  questionnaire: any;
  trial_ids: any;
  email: any;
  patientId: any;
  condition: any;
  location: 'Worldwide';
  radius: 'Worldwide';
}

@Component({
  selector: 'app-tsr-popup',
  templateUrl: './tsr-popup.component.html',
  styleUrls: ['./tsr-popup.component.css']
})
export class TsrPopupComponent implements OnInit {

  initial_condition: any;

  constructor(
    private questionnaireService: QuestionnaireService,
    public dialogRef: MatDialogRef<TsrPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

    console.log(this.data.trial_ids)

    this.initial_condition = this.data.condition;
    if (this.initial_condition === 'savedStudies') {
      this.data.condition = '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateTSR(email: any, questionnaire: any, patientId: any, condition: any, location: any, radius: any, trial_ids: any) {
    this.questionnaireService.generateTsr(email, questionnaire, patientId, condition, location, radius, trial_ids);
  }

}
