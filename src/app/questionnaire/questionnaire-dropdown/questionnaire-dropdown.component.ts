import { Component, OnInit, Input } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionnaire-dropdown',
  templateUrl: './questionnaire-dropdown.component.html',
  styleUrls: ['./questionnaire-dropdown.component.css']
})
export class QuestionnaireDropdownComponent implements OnInit {

  @Input() children: any[] = [];

  questionnaire: any;
  disabled: any;
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private questionnaireService: QuestionnaireService) {
    this.subscription = this.questionnaireService.questionnaire$.subscribe(response => { this.questionnaire = response });
    this.subscription2 = this.questionnaireService.disabled$.subscribe(response => this.disabled = response);
   }

  ngOnInit() {
    this.subscription = this.questionnaireService.questionnaire$.subscribe(response => { this.questionnaire = response });
    this.subscription2 = this.questionnaireService.disabled$.subscribe(response => this.disabled = response);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  optionsInShown = (children:any ) => {
    return children.map((a: any) => a.id).some((r:any) => this.questionnaire.show.includes(r))
  }

  toInclude = (children:any) => {
    return children.filter((child:any) => 
      this.questionnaire.preview.includes(child.id) && 
      !(this.questionnaire.questions.map((a:any) => a.id).includes(child.id))
    )
  }

  checkAnswered = (id: any) => {
    return this.questionnaire.questions.map((a: any) => a.id).includes(id)
  }

  onChange(event:any) {
      this.questionnaireService.processAnswer(event.value, "BOOLEAN", true, this.questionnaire);
  }

}
