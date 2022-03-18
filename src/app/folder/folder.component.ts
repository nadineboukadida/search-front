import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit, OnChanges {
  
  @Input() label = '';
  @Input() id = '';
  @Input() children: any[] = [];
  @Input() expanded = false;

  expand() {
    this.expanded = !this.expanded;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}
