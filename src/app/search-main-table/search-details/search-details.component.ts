import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { elementAt, Subscription } from "rxjs";
import { SearchService } from "src/app/services/search.service";
import { MatDialog } from "@angular/material/dialog";
import { SearchFeedbackDialogComponent } from "../search-feedback-dialog/search-feedback-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommentComponent } from "./comment/comment.component";

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
  url = "http://localhost:3000";
  token = "";
  hcpId = "";
  liked_comments: any = [];
  new_array: string[] = [];
  currentReplies: any[] = [];
  liked_comments_ids: any[] = [];
  my_comments_list: any[] = [];
  currentShowingIndex: number = -1;
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
    this.token = String(routeParams.get("token"));

    this.trialDetailsSubscription = this.searchService.trialDetails$.subscribe(
      (response: any) => (this.trialDetails = response.data?.studies[0])
    );
    this.searchService.getTrialDetails(this.trialId);
    this.getComments();
    this.searchService.getHcpId(this.token).subscribe((response: any) => {
      if (response && response.details) {
        this.hcpId = response.details.ContactId;
        this.fillMyComments();
      }

      this.searchService
        .getLikedComments(this.hcpId, this.url)
        .subscribe((response: any) => {
          this.liked_comments = response.data.result;
          this.liked_comments.forEach((element: any) => {
            this.liked_comments_ids.push(element.node.id);
          });
        });
    });
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
      .getComments(this.trialId, this.url)
      .subscribe((response: any) => {
        if (response && response.data && response.data.result) {
          this.comments = response.data.result;
          this.fillMyComments();
        }
      });
  }

  fillMyComments() {
    if (this.comments && this.hcpId) {
      this.comments.forEach((item) => {
        if (item.node.hcpId == this.hcpId)
          this.my_comments_list.push(item.node);
      });
    }
  }

  likeComment(item: any, index: any, replyIndex?:any) {
    this.searchService
      .likeComment(item.node.id, this.url, this.token)
      .subscribe(() => {
        if (this.liked_comments_ids.indexOf(item.node.id) != -1) {
          if (replyIndex) {
            debugger
            this.currentReplies[index][replyIndex].node.likeNumber.low =
            this.currentReplies[index][replyIndex].node.likeNumber.low - 1;
          } else {
               this.comments[index].node.likeNumber.low =
            this.comments[index].node.likeNumber.low - 1;
          }
          this.liked_comments_ids = this.liked_comments_ids.filter(function (
            element
          ) {
            return element != item.node.id;
          });
          this.openSnackBar("comment disliked!");
        } else {
          if(replyIndex) {
       this.currentReplies[index][replyIndex].node.likeNumber.low =
           this.currentReplies[index][replyIndex].node.likeNumber.low + 1;

          }else {
                    this.comments[index].node.likeNumber.low =
            this.comments[index].node.likeNumber.low + 1;

          }
  
          this.liked_comments_ids.push(item.node.id);
          this.openSnackBar("comment liked!");
        }
      });
  }

  deleteComment(item: any, index: any) {
    this.searchService
      .deleteComment(item.node.id, this.token, this.url)
      .subscribe(() => {
        debugger
        this.comments = this.comments.filter(function (element) {
          return element != item.node.id;
        });
        this.openSnackBar("comment deleted!");
      });
  }

  configureComment(item?: any, index?: any) {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: "500px",
    });
    if (item) {
      dialogRef.componentInstance.comment = item.node.content;
      dialogRef.afterClosed().subscribe((response) => {
        this.searchService
          .editComment(item.node.id, response, this.url, this.token)
          .subscribe(() => {
            this.comments[index].node.content = response;
            this.openSnackBar("your comment has been updated!");
          });
      });
    } else {
      dialogRef.afterClosed().subscribe((response) => {
        this.searchService
          .addComment(this.trialId, response, this.url, this.token)
          .subscribe((createResponse: any) => {
            if (
              createResponse &&
              createResponse.data &&
              createResponse.data.result
            ) {
              this.comments.push({ node: createResponse.data.result });
              this.my_comments_list.push(createResponse.data.result);
              this.openSnackBar("your comment has been added!");
            }
          });
      });
    }
  }

  addReply(commentId: string, index: any) {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.searchService
        .addReply(
          this.url,
          this.trialId,
          this.hcpId,
          response,
          commentId,
          this.token
        )
        .subscribe((response1: any) => {
          this.currentReplies[index]=   this.currentReplies[index]? this.currentReplies[index] : []
          this.currentReplies[index].push({node: response1.data.result});
          this.comments[index].node.replyNumber.low= this.comments[index].node?.replyNumber?.low +1 ;
          this.openSnackBar("your reply has been added!");
        });
    });
  }
  toggleReplies(commentId: string, index: number) {
    if (!this.currentReplies[index]) {
      this.searchService
        .getReplies(this.url, commentId)
        .subscribe((response: any) => {
          if (response && response.data && response.data.result ) {
            this.currentReplies[index] = response.data.result;
            this.currentShowingIndex = index;
          }
        });
    } else if (this.currentShowingIndex != -1) {
      this.currentShowingIndex = -1;
    } else this.currentShowingIndex = index;
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      panelClass: ["primary"],
    });
  }
}
