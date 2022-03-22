import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explainer',
  templateUrl: './explainer.component.html',
  styleUrls: ['./explainer.component.css']
})
export class ExplainerComponent {

  explainers = [
    {
      title: 'Search for Treatment Options',
      text: 'Our search only includes clinical trials (CTs) and expanded access programs (EAPs) that are relevant and available for people looking for treatment options in development. Our medical team has manually judged every option for relevance, based on a strict set of rules. The data is updated daily, and is pulled from the major US and EU trial registries.',
      beta: false,
      image: 'SearchTreatmentOptions01.png'
    },
    {
      title: 'Community Feedback',
      text: 'Clinical trial registries often have outdated information. Our community of patients and physicians report to us the latest recruiting status of CTs and EAPs. We reflect reports of wrong statuses in our treatment search. We made giving feedback is easy, causing us to be the most up to date database for finding treatment options in development.',
      beta: true,
      image: 'CommunityFeedback01.png'
    },
    {
      title: 'Automatic Eligibility Screening',
      text: 'It’s cumbersome to check every possible trial for its eligibility criteria. A lot of trials share the same criteria, but you can’t screen for them simultaneously. Our medical reviewers have standardized eligibility criteria for select diseases, allowing us to screen through eligibility criteria automatically. Input a medical profile, and we automatically filter the available treatment options for its eligibility.',
      beta: true,
      image: 'AutomaticElegibility01.png'
    },
  ]

}
