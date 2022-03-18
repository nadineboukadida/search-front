import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  library: any;
  librarySubscription: Subscription;

  constructor(private libraryService: PostService) {
    this.librarySubscription = this.libraryService.library$.subscribe((response: any) => this.library = response);
  }
  
  ngOnInit() { 
    this.librarySubscription = this.libraryService.library$.subscribe((response: any) => this.library = response);
  }
}
