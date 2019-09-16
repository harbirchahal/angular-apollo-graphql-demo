import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly navLinks = [
    { link: '/home', label: 'Home', icon: 'dashboard' },
    { link: '/users', label: 'All Users', icon: 'people' },
    { link: '/posts', label: 'All Posts', icon: 'comment' },
  ];

  @ViewChild('sidenav', { static: true })
  private readonly sidenav: MatSidenav;

  constructor(private router: Router) { }

  navigateTo(url: string) {
    this.sidenav.close();
    this.router.navigateByUrl(url);
  }

}
