import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  getEndpoint() {
    if (environment.production) {
      return 'enterprise-search' 
    } else {
      return 'enterprise-search-develop'
    }
  }
}
