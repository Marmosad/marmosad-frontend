import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-navigate',
  templateUrl: './splash-navigate.component.html',
  styleUrls: ['./splash-navigate.component.css']
})
export class SplashNavigateComponent implements OnInit {

  toCore(): void {
    console.log('redirecting to core');
    this.router.navigate(['/core']);
  }
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
