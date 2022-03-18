import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css']
})
export class CreateButtonComponent implements OnInit {

  @Input() parent_id = '';

  constructor() { }

  ngOnInit(): void {
  }

}
