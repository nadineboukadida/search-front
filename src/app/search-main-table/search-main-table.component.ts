import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';
import { QuestionnaireService } from '../services/questionnaire.service';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';
import { TsrPopupComponent } from '../tsr-dialog/tsr-popup/tsr-popup.component';
import { QuestionnairePopupComponent } from '../questionnaire/questionnaire-popup/questionnaire-popup.component';
import { FILTERS_DEFAULT_VALUES } from '../types/search-filters.const';

@Component({
  selector: 'app-search-main-table',
  templateUrl: './search-main-table.component.html',
  styleUrls: ['./search-main-table.component.css']
})
export class SearchMainTableComponent implements OnInit, OnDestroy {

  @ViewChild('templateBottomSheet') TemplateBottomSheet: any;
  @ViewChild(MatPaginator) paginator: any;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  columnsToDisplay = ['select', 'protocol_type', 'phase', 'overall_status', 'title', 'interventions'] 
  greenList = ['Recruiting']
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<Element>(true, []);
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  searchSubscription: Subscription;
  searchResults: any;
  
  questionnaireSubscription: Subscription;
  questionnaireResults: any
 
  condition = 'Duchenne Muscular Dystrophy';
  country = null;
  lat = null;
  lng = null;
  distance = null;
  private questionnaireConditions = ['Muscular Dystrophy, Duchenne', "Glioblastoma"]
  questionnaireCondition = true;
  @Input() user = 'physician';
  @Input() answer = null;

  private popupOpened = false;
  loading = true;

  filters: any;
  defaultFilters = FILTERS_DEFAULT_VALUES;
  
  constructor(
    private searchService: SearchService, 
    private bottomSheet: MatBottomSheet, 
    private questionnaireService: QuestionnaireService, 
    private libraryService: PostService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
    ) {
    this.searchSubscription = this.searchService.searchResults$.subscribe((response: any) => { this.searchResults = response.data.studies; this.dataSource.data = this.searchResults; this.loading = false;});
    this.questionnaireSubscription = this.questionnaireService.questionnaire$.subscribe((response: any) => this.searchResults = this.searchResults.filter((study: any) => response.trial_ids.includes(study.id), this.dataSource.data = this.searchResults, this.questionnaireResults = response))
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  openDialog(): void {
    if (this.condition !== "savedStudies") {
      let questionnaire = this.questionnaireResults
      const dialogRef = this.dialog.open(TsrPopupComponent, {
        width: '300px',
        data: { questionnaire: questionnaire, condition: this.condition }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.openSnackBar()
        }
      });
    } else {
      let questionnaire = {
        trial_ids: this.searchResults.map((item: any) => item.id)
      }
      const dialogRef = this.dialog.open(TsrPopupComponent, {
        width: '300px',
        data: { questionnaire: questionnaire, condition: this.condition }
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.openSnackBar()
        }
      })
    }
    
  }

  openQuestionnairePopup(): void {
    const dialogRef = this.dialog.open(QuestionnairePopupComponent, {
      width: 'auto',
      data: { 
        amount: this.searchResults.length,
        condition: this.condition,
        country: this.country,
        distance: this.distance
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.openTemplateSheetMenu();
      }
    })
  }

  openSnackBar() {
    this.snackBar.open("Your Treatment Search Report will be sent to you shortly.", "Close", {
      duration: 5000,
      panelClass: 'snackbar'
    });
  }

  openTemplateSheetMenu() {
    this.bottomSheet.open(this.TemplateBottomSheet);
  }
  
  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }

  handleCondition() {
    let condition = this.condition;
    if (condition === 'savedStudies') {
      this.questionnaireCondition = false;
      this.searchSubscription = this.searchService.searchResults$.subscribe((response: any) => {
        this.searchResults = response.data.studies,
        this.dataSource.data = this.searchResults;
      });

    } else if (this.questionnaireConditions.includes(condition)) {
      this.questionnaireCondition = true;
      this.questionnaireSubscription = this.questionnaireService.questionnaire$.subscribe((response: any) => {
        this.searchResults = this.searchResults.filter((study: any) => response.trial_ids.includes(study.id)),
        this.dataSource.data = this.searchResults,
        this.questionnaireResults = response,
        this.openQuestionnairePopupFunction();
      })
      this.searchSubscription = this.searchService.searchResults$.subscribe((response: any) => {
        this.searchResults = response.data.studies,
          this.questionnaireService.getQuestionnaire(response.data.studies.map((item: any) => item.id), this.user, this.answer),
          this.dataSource.data = this.searchResults;
      });
      this.libraryService.getLibrary();

    } else {
      this.questionnaireCondition = false;
      this.searchSubscription = this.searchService.searchResults$.subscribe((response: any) => {
        this.searchResults = response.data.studies,
          this.dataSource.data = this.searchResults;
      });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.condition = params.condition, 
      this.country = params.country,
      this.lat = params.lat,
      this.lng = params.lng,
      this.distance = params.distance
      this.filters = {}
      this.filters['Age'] = params.age !== undefined ? params.age : this.defaultFilters.Age;
      this.filters['Sex'] = params.sex !== undefined ? params.sex : this.defaultFilters.Sex;
      this.filters['ClinicalStudy'] = params.ct !== undefined ? (params.ct === "true") : this.defaultFilters.ClinicalStudy;
      this.filters['ExpandedAccess'] = params.ea !== undefined ? (params.ea === "true") : this.defaultFilters.ExpandedAccess;
      this.filters['Phase1'] = params.p1 !== undefined ? (params.p1 === "true") : this.defaultFilters.Phase1;
      this.filters['Phase2'] = params.p2 !== undefined ? (params.p2 === "true") : this.defaultFilters.Phase2;
      this.filters['Phase3'] = params.p3 !== undefined ? (params.p3 === "true") : this.defaultFilters.Phase3;
      this.filters['Phase4'] = params.p4 !== undefined ? (params.p4 === "true") : this.defaultFilters.Phase4;
      this.filters['PhaseNotSpecified'] = params.pn !== undefined ? (params.pn === "true") : this.defaultFilters.PhaseNotSpecified;
      this.filters['NotYetRecruiting'] = params.rn !== undefined ? (params.rn === "true") : this.defaultFilters.NotYetRecruiting;
      this.filters['Recruiting'] = params.recruiting !== undefined ? (params.recruiting === "true") : this.defaultFilters.Recruiting;
      this.filters['UnknownStatus'] = params.un !== undefined ? (params.un === "true") : this.defaultFilters.UnknownStatus;
    })
    this.handleCondition()
    this.getTrials()
  }
  
  openQuestionnairePopupFunction() {
    console.log(this.questionnaireCondition, this.popupOpened)
    if (this.questionnaireCondition && !this.popupOpened) {
      this.openQuestionnairePopup()
      this.popupOpened = true;
    }
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.questionnaireSubscription.unsubscribe();
  }
  
  getTrials() {
    if (this.condition === 'savedStudies') {
      let currentSaved = localStorage.getItem('saved_trials')
      if (currentSaved) {
        let trialIds = JSON.parse(currentSaved)
        this.searchService.getTrials(trialIds)
      } else {
        let trialIds = [''];
        this.searchService.getTrials(trialIds)
      }
    } else {
      this.searchService.getFilteredTrials(this.condition, this.country, this.lat, this.lng, this.distance, this.filters)
    }
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

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToDetails(trialId: any) {
    this.router.navigate(['/search', trialId]);
  }

  handleSelection(trialId: any) {
    let currentSaved = localStorage.getItem('saved_trials')
    if (!currentSaved) {
      localStorage.setItem('saved_trials', JSON.stringify([trialId]))
    } else {
      let currentSavedLst = JSON.parse(currentSaved)
      if (currentSavedLst.includes(trialId)) {
        currentSavedLst.splice(currentSavedLst.indexOf(trialId), 1);
        localStorage.setItem('saved_trials', JSON.stringify(currentSavedLst))
      } else {
        currentSavedLst.push(trialId)
        localStorage.setItem('saved_trials', JSON.stringify(currentSavedLst))
      }
    }
  }

  inLocalStorage(trialId: any) {
    let currentSaved = localStorage.getItem('saved_trials')
    if (!currentSaved) {
      return false
    } else {
      return JSON.parse(currentSaved).includes(trialId)
    }
  }

  getNumSaved() {
    let currentSaved = localStorage.getItem('saved_trials')
    if (!currentSaved) {
      return 0
    } else {
      return JSON.parse(currentSaved).length
    }
  }
}

export interface Element {
  id: string;
  protocol_type: string;
  phase: string;
  title: string;
  overall_status: string;
  interventions: string[];
  reports_as_closed: any;
  location: any;
}