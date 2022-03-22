import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { EndpointsService } from './endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private library = new BehaviorSubject({});
  library$ = this.library.asObservable();
  
  constructor(
    private httpClient: HttpClient,
    private endpointService: EndpointsService
  ) { }
  
  getLibrary() {
    let url = `https://${this.endpointService.getEndpoint()}.mytomorrows.com/v01/library/get_full_tree`;
    let body = {node: { id: "C"}}
    this.httpClient.post(url, body).subscribe((response: any) => { this.library.next(response); });
  }
}
