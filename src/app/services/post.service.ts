import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private library = new BehaviorSubject({});
  library$ = this.library.asObservable();
  
  constructor(private httpClient: HttpClient) { }
  
  getLibrary() {
    let url = 'https://enterprise-search-develop.mytomorrows.com/v01/library/get_full_tree';
    let body = {node: { id: "C"}}
    this.httpClient.post(url, body).subscribe((response: any) => { this.library.next(response); });
  }
}
