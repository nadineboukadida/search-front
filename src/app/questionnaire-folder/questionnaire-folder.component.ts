import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { QuestionnaireService } from '../services/questionnaire.service';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionnaire-folder',
  templateUrl: './questionnaire-folder.component.html',
  styleUrls: ['./questionnaire-folder.component.css']
})
export class QuestionnaireFolderComponent implements OnInit, OnDestroy {

  @Input() id = '';
  @Input() label = '';
  @Input() type = '';
  @Input() children: any[] = [];

  questionnaire: any;
  disabled: any;
  subscription: Subscription;
  subscription2: Subscription;
  
  answer: any;
  float = '0'
  answered = false;
  
  constructor(private questionnaireService: QuestionnaireService, private searchService: SearchService) { 
    this.subscription = this.questionnaireService.questionnaire$.subscribe(response => { this.questionnaire = response });
    this.subscription2 = this.questionnaireService.disabled$.subscribe(response => this.disabled = response);
  }
  
  floatValueChange(newValue: string) {
    this.float = newValue;
  }

  ngOnInit() {
    this.subscription = this.questionnaireService.questionnaire$.subscribe(response => { this.questionnaire = response});
    this.subscription2 = this.questionnaireService.disabled$.subscribe(response => this.disabled = response);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  processAnswer(id:string, type:string, answer:any) {
    this.answer = answer;
    this.answered = true;
    this.questionnaireService.processAnswer(id, type, answer, this.questionnaire);
  }

  checkIfAnswered() {
    return this.questionnaire.questions.filter((study: any) => study.answer !== null).map((item: any) => item.id).includes(this.id)
  }

  getAnswer() {
    return this.questionnaire.questions.filter((study: any) => study.answer !== null).filter((item: any) => item.id === this.id).map((item:any) => item.answer)[0]
  }

  nonFloatChildren = (children: any) => children.filter((obj: any) => {
    return obj.properties.type !== "FLOAT"
  })
  floatChildren = (children: any) => children.filter((obj: any) => {
    return obj.properties.type === "FLOAT"
  })

}