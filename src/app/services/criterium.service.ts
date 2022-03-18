import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CriteriumService {

  private url = 'https://enterprise-search-develop.mytomorrows.com/v01/library/get_node';

  constructor(private httpClient: HttpClient) { }

  getCriterium(criteriumId: string) {
    return this.httpClient.post(
      this.url,
      { node: { id: criteriumId}}
    );
  }

}
