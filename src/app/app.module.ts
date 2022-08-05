import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { FileComponent } from './file/file.component';
import { LibraryComponent } from './library/library.component';
import { CriteriumDetailsComponent } from './criterium-details/criterium-details.component';
import { CriteriumCreateComponent } from './criterium-create/criterium-create.component';
import { CreateButtonComponent } from './create-button/create-button.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireFolderComponent } from './questionnaire-folder/questionnaire-folder.component';
import { SearchMainTableComponent } from './search-main-table/search-main-table.component';
import { SearchLpComponent } from './search-lp/search-lp.component';
import { SearchAutocompleteComponent } from './search-autocomplete/search-autocomplete.component';
import { SearchFilterboxComponent } from './search-filterbox/search-filterbox.component';
import { TsrPopupComponent } from './tsr-dialog/tsr-popup/tsr-popup.component';
import { SearchFeedbackDialogComponent } from './search-main-table/search-feedback-dialog/search-feedback-dialog.component';
import { SearchDetailsComponent } from './search-main-table/search-details/search-details.component';
import { SearchSitesTableComponent } from './search-main-table/search-sites-table/search-sites-table.component';
import { QuestionnaireDropdownComponent } from './questionnaire/questionnaire-dropdown/questionnaire-dropdown.component';
import { QuestionnairePopupComponent } from './questionnaire/questionnaire-popup/questionnaire-popup.component';
import { SearchMobileCardComponent } from './search-main-table/search-details/search-mobile-card/search-mobile-card.component';
import { MiniCardComponent } from './search-main-table/search-details/search-mobile-card/mini-card/mini-card.component';
import { LocalSaveCheckboxComponent } from './search-main-table/local-save-checkbox/local-save-checkbox.component';
import { ExplainerComponent } from './search-lp/explainer/explainer.component';
import { PanelComponent } from './search-lp/explainer/panel/panel.component';
import { RegistryTableComponent } from './search-main-table/search-details/registry-table/registry-table.component';
import { FreetextSearchBoxComponent } from './search-lp/freetext-search-box/freetext-search-box.component';
import { PickUserTypeComponent } from './questionnaire/pick-user-type/pick-user-type.component';
import { PoemRulesComponent } from './search-lp/poem-rules/poem-rules.component';
import { MatCarouselModule } from 'ng-mat-carousel';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AddModalComponent } from './search-main-table/search-details/add-modal/add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    FileComponent,
    LibraryComponent,
    CriteriumDetailsComponent,
    CriteriumCreateComponent,
    CreateButtonComponent,
    QuestionnaireComponent,
    QuestionnaireFolderComponent,
    SearchMainTableComponent,
    SearchLpComponent,
    SearchAutocompleteComponent,
    SearchFilterboxComponent,
    TsrPopupComponent,
    SearchFeedbackDialogComponent,
    SearchDetailsComponent,
    SearchSitesTableComponent,
    QuestionnaireDropdownComponent,
    QuestionnairePopupComponent,
    SearchMobileCardComponent,
    MiniCardComponent,
    LocalSaveCheckboxComponent,
    ExplainerComponent,
    PanelComponent,
    RegistryTableComponent,
    FreetextSearchBoxComponent,
    PickUserTypeComponent,
    PoemRulesComponent,
    AddModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchLpComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'criteria/:criteriumId', component: CriteriumDetailsComponent },
      { path: 'create/:parentId', component: CriteriumCreateComponent },
      { path: 'search', component: SearchMainTableComponent },
      { path: 'search/:trialId/:token', component: SearchDetailsComponent },
      { path: 'search/:trialId', component: SearchDetailsComponent },
      { path: 'rules', component: PoemRulesComponent }
    ]),
    NoopAnimationsModule,
    MatTableModule,
    MatBottomSheetModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    FlexLayoutModule,
    MatRadioModule,
    MatDividerModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
