import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchFeedbackDialogComponent } from '../search-feedback-dialog/search-feedback-dialog.component';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {

  trialId: any;

  trialDetailsSubscription: Subscription;
  trialDetails: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    public dialog: MatDialog
    ) { 
    this.trialDetailsSubscription = this.searchService.trialDetails$.subscribe(() => console.log('done'));
    }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const trialIdFromRoute = String(routeParams.get('trialId'));
    this.trialId = trialIdFromRoute;
    this.trialDetailsSubscription = this.searchService.trialDetails$.subscribe((response: any) => this.trialDetails = response.data.studies[0]);
    this.searchService.getTrialDetails(this.trialId)
  }

  getCriteria(inex:any, eligibilityJson:any ) {
    if (inex === "inclusion") {
      return JSON.parse(eligibilityJson).inclusion
    } else if (inex === "exclusion") {
      return JSON.parse(eligibilityJson).exclusion
    }
  }

  goBack() {
    window.history.back();
  }

  checkIfIntAndOverZero(value: any) {
    if (typeof value === 'number' && value > 0) {
      return true
    } else if (typeof value === 'string' && parseInt(value) > 0) {
      return true
    } else {
      return false
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchFeedbackDialogComponent, {
      width: '300px',
      data: { trialId: this.trialId }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

}
