import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pick-user-type',
  templateUrl: './pick-user-type.component.html',
  styleUrls: ['./pick-user-type.component.scss']
})
export class PickUserTypeComponent {

  @Output() newUserEvent = new EventEmitter<string>();
  emitUser(value: any) {
    this.newUserEvent.emit(value);
  }

}
