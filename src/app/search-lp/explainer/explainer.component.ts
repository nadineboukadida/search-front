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
      text: 'Our search only includes clinical trials (CTs) and expanded access programs (EAPs) that are relevant and available for you. Our medical team has personally judged every option for relevance, based on a strict set of rules. The data is updated daily, and is pulled from Clinicaltrials.gov and EudraCT. ',
      beta: false,
      image: 'SearchTreatmentOptions01.png',
      relative_url: "/rules",
      link_text: "Learn more about the rules",
      params: null
    },
    {
      title: 'Community Feedback',
      text: 'Clinical trial registries sometimes have outdated information. Our community of patients and physicians report the latest recruiting status of CTs and EAPs to us. Based on this input, we constantly update these statuses in our Treatment Search. We make giving feedback easy as we aim to be the most up-to-date search engine for finding treatment options in development. ',
      beta: true,
      image: 'CommunityFeedback01.png',
      relative_url: null,
      link_text: null,
      params: null
    },
    {
      title: 'Automatic Eligibility Screening',
      text: 'It’s cumbersome to check every possible trial for its eligibility criteria. A lot of trials share the same criteria, but you can’t screen for them simultaneously. Our medical reviewers have standardized eligibility criteria for select diseases, allowing us to screen through eligibility criteria automatically. Input a medical profile, and we automatically filter the available treatment options to check for eligibility. ',
      beta: true,
      image: 'AutomaticElegibility01.png',
      relative_url: "/search",
      // link_text: "Explore an example",
      // params: {condition: "Muscular Dystrophy, Duchenne"}
      link_text: null,
      params: null
    },
  ]

}
