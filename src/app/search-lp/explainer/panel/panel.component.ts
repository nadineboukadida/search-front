import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  @Input() item: any;

  getIcon() {
    let ref = `../../../../assets/${this.item.image}`
    console.log(ref)
    return ref
  }
}
