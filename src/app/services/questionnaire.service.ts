import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private url = 'https://enterprise-search-develop.mytomorrows.com/v01/search/questionnaire';
  private headers = {'Content-Type': 'application/json'}

  private questionnaire = new BehaviorSubject({});
  questionnaire$ = this.questionnaire.asObservable();

  private disabled = new BehaviorSubject(false);
  disabled$ = this.disabled.asObservable();

  constructor(private httpClient: HttpClient) { }

  getQuestionnaire(trial_ids: string[], user: string, answer: any) {
    let body = {
      trial_ids:trial_ids,
      user:user,
      mode:'gk-library',
      answer: answer
    }
    this.httpClient.post(this.url, body, { headers: this.headers }).subscribe((response: any) => this.questionnaire.next(response));
  }

  processAnswer(id: string, type: string, answer: any, questionnaire:any) {
    this.disable()
    questionnaire.answered_question = {
      id: id,
      answer: answer,
      type: type
    }
    this.httpClient.post(this.url, questionnaire, { headers: this.headers }).subscribe((response: any) => { this.questionnaire.next(response); this.enable()});
  }

  generateTsr(email: any, questionnaire: any, patientId: any, condition: any, location: any, radius: any) {
    let endpt = 'https://enterprise-search-develop.mytomorrows.com/v01/search/request_tsr';
    let copy = questionnaire
    copy.email = email;
    copy.patient_id = patientId ?? "Unspecified";
    copy.disease = condition;
    copy.location = location;
    copy.radius = radius;
    let body = {
      email: email,
      trial_ids: copy.trial_ids,
      tsr_details: copy
    }
    this.httpClient.post(endpt, body, { headers: this.headers }).subscribe(() => console.log('done'));
  }

  enable() {
    this.disabled.next(false)
  }

  disable() {
    this.disabled.next(true)
  }
}