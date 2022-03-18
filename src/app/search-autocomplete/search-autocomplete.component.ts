import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, startWith, distinctUntilChanged, switchMap, map } from 'rxjs';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.css']
})
export class SearchAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  countryControl = new FormControl();
  countryFilteredOptions: Observable<any[]>;

  condition = null;
  @Output() newConditionEvent = new EventEmitter<string>();
  emitNewCondition(value: any) {
    this.newConditionEvent.emit(value);
  }

  country = null;
  @Output() newCountryEvent = new EventEmitter<string>();
  emitNewCountry(value: any) {
    this.newCountryEvent.emit(value);
  }
  
  currentPosition: any;
  @Output() newPositionEvent = new EventEmitter<object>();
  emitNewPosition(value: any) {
    this.newPositionEvent.emit(value);
  }

  distance = null;
  @Output() newDistanceEvent = new EventEmitter<number>();
  emitNewDistance(value: any) {
    this.newDistanceEvent.emit(value);
  }

  constructor(private searchService: SearchService) {
    this.filteredOptions = 
    this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )

    this.countryFilteredOptions =
      this.countryControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.countryFilter(val || '')
        })
      )
   }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {};
        this.currentPosition.lat = position.coords.latitude;
        this.currentPosition.lng = position.coords.longitude;
      });
    } else {
      console.log("No support for geolocation");
    }
  }

  filter(val: string): Observable<any[]> {
    this.emitNewCondition(this.condition);
    return this.searchService.getConditions(val)
      .pipe(
        map((response: any) => response.data.autoComplete.filter((option: any) => {
          return true
        }))
      )
  }

  countryFilter(val: string): Observable<any[]> {
    this.emitNewCountry(this.country);
    return this.searchService.getCountries(val)
      .pipe(
        map((response: any) => response.data.countryAutoComplete.filter((option: any) => {
          return true
        }))
      )
  }

}
