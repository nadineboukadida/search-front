import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-lp',
  templateUrl: './search-lp.component.html',
  styleUrls: ['./search-lp.component.css']
})
export class SearchLpComponent  {

  condition: any;
  country: any;
  currentPosition: any;
  distance: any;

  substring: any;

  filters: any

  constructor(private router: Router) { }

  clearValuesFor(mode: any) {
    if (mode === "condition") {
      this.condition = null;
      this.country = null;
      this.distance = null;
    } else if (mode === "substring" && (this.condition || this.country || this.country)) {
      this.substring = null;
    }
  }

  setCondition(value: any) {
    this.clearValuesFor("substring")
    this.condition = value;
  }

  setCountry(value: any) {
    this.clearValuesFor("substring")
    this.country = value;
  }

  setPosition(value: any) {
    this.currentPosition = value;
  }

  setDistance(value: any) {
    this.clearValuesFor("substring")
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

  checkEnabled() {
    if (typeof this.condition === 'string' || this.substring ) {
      return false
    } else {
      return true
    }
  }

  setSubstring(value: any) {
    this.substring = value;
    this.clearValuesFor("condition")
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

    if (this.substring) {
      params.queryParams['substring'] = this.substring;
    }

    this.router.navigate(
      ['/search'],
      params
    );
  }

}
