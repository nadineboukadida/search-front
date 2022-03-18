import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriumService } from '../services/criterium.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-criterium-details',
  templateUrl: './criterium-details.component.html',
  styleUrls: ['./criterium-details.component.css']
})
export class CriteriumDetailsComponent implements OnInit {

  criterium: any;

  headers = {
    'Content-Type': 'application/json'
  }
  
  constructor(private route: ActivatedRoute, private service: CriteriumService, private httpClient: HttpClient) { }
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const criteriumIdFromRoute = String(routeParams.get('criteriumId'));
    this.service.getCriterium(criteriumIdFromRoute)
    .subscribe(response => {
      this.criterium = response;
    });
  }

  update(): void {
    let url = 'https://enterprise-search-develop.mytomorrows.com/v01/library/update_node';
    this.httpClient.post(
      url,
      {node: this.criterium}
    ).subscribe(response => {
      window.location.href = "/";
    });
  }

  delete(): void {
    let url = 'https://enterprise-search-develop.mytomorrows.com/v01/library/delete_node';
    this.httpClient.post(
      url,
      { node: this.criterium }
    ).subscribe(response => {
      window.location.href = "/";
    });
  }

}
