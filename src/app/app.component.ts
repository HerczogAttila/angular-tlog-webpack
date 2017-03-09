import { Component, OnInit } from '@angular/core';

import '../style/app.scss';
import { PagerService } from './shared/services/pager.service';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TLOG16 angular webpack';

  static getColor(n: number) {
    if (n >= 0) {
      return 'green';
    } else {
      return 'red';
    }
  }

  constructor(private pagerService: PagerService) { }

  ngOnInit(): void {
    this.pagerService.init();
  }
}
