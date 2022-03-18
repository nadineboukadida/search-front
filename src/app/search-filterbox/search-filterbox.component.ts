import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FILTERS_DEFAULT_VALUES } from '../types/search-filters.const';

@Component({
  selector: 'app-search-filterbox',
  templateUrl: './search-filterbox.component.html',
  styleUrls: ['./search-filterbox.component.css']
})
export class SearchFilterboxComponent implements OnInit {

  form: any;

  
  constructor() { }

  ngOnInit(): void {
    this.form = FILTERS_DEFAULT_VALUES;
    this.emitNewFilters();
  }

  @Output() newFilterEvent = new EventEmitter<object>();
  emitNewFilters() {
    let filter = this.form;
    this.newFilterEvent.emit(filter);
  }

}
