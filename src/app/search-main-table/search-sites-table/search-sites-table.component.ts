import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-sites-table',
  templateUrl: './search-sites-table.component.html',
  styleUrls: ['./search-sites-table.component.css']
})
export class SearchSitesTableComponent implements OnInit {

  columnsToDisplay = ['sitename', 'countryname', 'city']
  dataSource = new MatTableDataSource()

  @Input() sitesList: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.sitesList
  }

}
