import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-lp',
  templateUrl: './search-lp.component.html',
  styleUrls: ['./search-lp.component.css']
})
export class SearchLpComponent implements OnInit {

  condition: any;
  country: any;
  currentPosition: any;
  distance: any;

  filters: any

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setCondition(value: any) {
    this.condition = value;
  }

  setCountry(value: any) {
    this.country = value;
  }

  setPosition(value: any) {
    this.currentPosition = value;
  }

  setDistance(value: any) {
    this.distance = value;
  }

  setFilters(value: any) {
    this.filters = value;
  }

  setParams() {
    if (this.currentPosition) {
      let distance;
      if (this.distance !== null) {
        distance = this.distance * 1000
      } else {
        distance = this.distance
      }
      return { queryParams: { condition: this.condition, lat: this.currentPosition.lat, lng: this.currentPosition.lng, distance: distance } }
    } else {
      return { queryParams: { condition: this.condition, country: this.country } }
    }
  }

  checkForCondition() {
    if (typeof this.condition === 'string') {
      return false
    } else {
      return true
    }
  }

  goToSearch() {
    let params: any = this.setParams();
    params.queryParams['age'] = this.filters.Age;
    params.queryParams['sex'] = this.filters.Sex;
    params.queryParams['ct'] = this.filters.ClinicalStudy;
    params.queryParams['ea'] = this.filters.ExpandedAccess;
    params.queryParams['p1'] = this.filters.Phase1;
    params.queryParams['p2'] = this.filters.Phase2;
    params.queryParams['p3'] = this.filters.Phase3;
    params.queryParams['p4'] = this.filters.Phase4;
    params.queryParams['pn'] = this.filters.PhaseNotSpecified;
    params.queryParams['cs'] = this.filters.Available;
    params.queryParams['rn'] = this.filters.NotYetRecruiting;
    params.queryParams['recruiting'] = this.filters.Recruiting;
    params.queryParams['un'] = this.filters.UnknownStatus;

    this.router.navigate(
      ['/search'],
      params
    );
  }

}
