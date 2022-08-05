import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { elementAt, Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchFeedbackDialogComponent } from '../search-feedback-dialog/search-feedback-dialog.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-search-details",
  templateUrl: "./search-details.component.html",
  styleUrls: ["./search-details.component.css"],
})
export class SearchDetailsComponent implements OnInit {
  trialId: any;

  trialDetailsSubscription: Subscription;
  trialDetails: any;
  comments: any[] = [];
  retrieveCommentsUrl = "http://localhost:3000";
  token = "";
  hcpId = "";
  liked_comments :any=[]
  new_array :string[] = []
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.trialDetailsSubscription = this.searchService.trialDetails$.subscribe(
      () => console.log("done")
    );
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const trialIdFromRoute = String(routeParams.get("trialId"));
    this.trialId = trialIdFromRoute;
    this.token =  String(routeParams.get("token"));
  
    this.trialDetailsSubscription = this.searchService.trialDetails$.subscribe(
      (response: any) => (this.trialDetails = response.data.studies[0])
    );
    this.searchService.getTrialDetails(this.trialId);
    this.getComments();
    this.searchService.getHcpId(this.token).subscribe((response:any)=> {
      if(response && response.details)
      this.hcpId = response.details.ContactType
      
      this.searchService.getLikedComments(this.hcpId,this.retrieveCommentsUrl).subscribe((response:any)=> {
        this.liked_comments = response.data.result
      this.liked_comments.forEach((element:any) => {
        if(element.node)
        this.new_array = element.node.id
      });
      })
    })
  }

  getCriteria(inex: any, eligibilityJson: any) {
    if (inex === "inclusion") {
      return JSON.parse(eligibilityJson).inclusion;
    } else if (inex === "exclusion") {
      return JSON.parse(eligibilityJson).exclusion;
    }
  }

  goBack() {
    window.history.back();
  }

  checkIfIntAndOverZero(value: any) {
    if (typeof value === "number" && value > 0) {
      return true;
    } else if (typeof value === "string" && parseInt(value) > 0) {
      return true;
    } else {
      return false;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchFeedbackDialogComponent, {
      width: "300px",
      data: { trialId: this.trialId },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  getInterventions() {
    return this.trialDetails.interventions.join(", ");
  }

  getConditions() {
    let parsed = JSON.parse(this.trialDetails.conditions);
    return parsed.join(", ");
  }

  getComments() {
    this.searchService
      .getComments(this.trialId, this.retrieveCommentsUrl)
      .subscribe((response: any) => {
        if (response && response.data && response.data.result)
          this.comments = response.data.result;
      });
  }
  likeComment(item:any) {
    this.searchService.likeComment(item.node.id,this.retrieveCommentsUrl,this.token).subscribe(()=> {
        this.liked_comments = this.liked_comments.filter((data:any) => data.node.id != item.node.id);
      this.openSnackBar('comment liked!')
    })
  }
  deleteComment(item:any) {
    this.searchService.deleteComment(item.node.id,this.token,this.retrieveCommentsUrl).subscribe(()=> {
      this.openSnackBar('comment deleted!')
    })
  }

  isLiked(item:any) {
    return this.new_array.indexOf(item.node.id)
  }
  addComment() {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((response) => {
      this.searchService
        .addComment(
          this.trialId,
          response,
          this.retrieveCommentsUrl,
          this.token
        )
        .subscribe(() => {
          this.openSnackBar("your comment has been added!")
        });
    });

}

openSnackBar(message:string) {
  this.snackBar.open(message, "Close", {
    duration: 5000,
    panelClass: 'primary'
  });
}  

}