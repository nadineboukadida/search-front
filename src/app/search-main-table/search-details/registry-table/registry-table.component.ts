import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registry-table',
  templateUrl: './registry-table.component.html',
  styleUrls: ['./registry-table.component.css']
})
export class RegistryTableComponent {

  @Input() references: any;

  parsedReferences = () => {
    console.log(this.references)
    return JSON.parse(this.references)
  }

}
