import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() loading = false;

  constructor() { }

  ngOnInit() {
  }

}
