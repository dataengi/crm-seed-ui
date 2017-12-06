import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class EmptyLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
