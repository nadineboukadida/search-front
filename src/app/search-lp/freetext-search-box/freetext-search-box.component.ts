import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-freetext-search-box',
  templateUrl: './freetext-search-box.component.html',
  styleUrls: ['./freetext-search-box.component.scss']
})
export class FreetextSearchBoxComponent {
 
  @Input() substring: any;
  
  @Output() newSubstringEvent = new EventEmitter<string>();
  emitNewSubstring(value: any) {
    this.newSubstringEvent.emit(value)
  }

}
