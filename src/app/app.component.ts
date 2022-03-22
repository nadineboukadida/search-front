import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  items = [
    {
      link_text: 'myTomorrows.com',
      link_url: 'https://www.mytomorrows.com',
      relative_url: null
    }, {
      link_text: 'Privacy Statement',
      link_url: 'https://mytomorrows.com/en/privacy-statement',
      relative_url: null
    }, {
      link_text: 'Cookie Statement',
      link_url: 'https://mytomorrows.com/en/cookie-statement',
      relative_url: null
    }
  ]

  title = 'myTomorrows Criteria Library';
}
