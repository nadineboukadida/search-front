import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  
  librarySubscription: Subscription;
  criteria: any;

  constructor(private libraryService: PostService) {
    this.librarySubscription = this.libraryService.library$.subscribe((response: any) => this.criteria = response);
   }

  ngOnInit() {
    this.librarySubscription = this.libraryService.library$.subscribe((response: any) => this.criteria = response);
    this.libraryService.getLibrary();
  }

}
