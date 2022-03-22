import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registry-table',
  templateUrl: './registry-table.component.html',
  styleUrls: ['./registry-table.component.css']
})
export class RegistryTableComponent implements OnInit {

  parsedReferences: any;
  columnsToDisplay = ['identifier', 'source']

  @Input() references: any;

  ngOnInit() {
    this.parsedReferences = this.parseReferences()
  }

  parseReferences() {
    if (this.references) {
      return JSON.parse(this.references)
    } else {
      return false
    }
  }

}
