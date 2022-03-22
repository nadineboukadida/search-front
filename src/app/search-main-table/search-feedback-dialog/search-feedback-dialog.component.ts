import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchService } from 'src/app/services/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  trialId: any;
  email: any;
}

@Component({
  selector: 'app-search-feedback-dialog',
  templateUrl: './search-feedback-dialog.component.html',
  styleUrls: ['./search-feedback-dialog.component.css']
})
export class SearchFeedbackDialogComponent {

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SearchFeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reportFeedback(email: any, trialId: any) {
    this.searchService.reportFeedback(email, trialId).subscribe(() => {this.dialogRef.close(); this.openSnackBar()})
  }

  openSnackBar() {
    this.snackBar.open("Thank you for your feedback, it will be reflected after refreshing.", "Close", {
      duration: 5000,
      panelClass: 'snackbar'
    });
  }

}
