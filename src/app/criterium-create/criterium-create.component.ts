import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criterium-create',
  templateUrl: './criterium-create.component.html',
  styleUrls: ['./criterium-create.component.css']
})
export class CriteriumCreateComponent implements OnInit {

  criterium: any;

  headers = {
    'Content-Type': 'application/json'
  }

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const parentIdFromRoute = String(routeParams.get('parentId'));
    this.criterium = {
      parent_id: parentIdFromRoute,
      properties: {
        type: "BOOLEAN",
        label: "",
        ask_to: "patient"
      }
    }
  };

  create(): void {
    let url = 'https://enterprise-search-develop.mytomorrows.com/v01/library/create_node';
    this.httpClient.post(
      url,
      { node: this.criterium }
    ).subscribe(response => {
      window.location.href = "/";
    });
  }

}
