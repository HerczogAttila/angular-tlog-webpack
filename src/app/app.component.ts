import { Component } from '@angular/core';

import '../style/app.scss';
import { WeekService } from './shared/services/week.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Time logger angular webpack';

  public static getColor(n: number): string {
    if (n >= 0) {
      return 'green';
    } else {
      return 'red';
    }
  }

  constructor(
      public weekService: WeekService,
      public translate: TranslateService,
      private router: Router,
  ) {
    translate.setDefaultLang('en');
    translate.use(navigator.language);

    Observable.interval(240000).subscribe(() => {
      if (localStorage.getItem('jwtToken')) {
        this.weekService.refresh().subscribe(jwtToken => {
          this.weekService.setJWTToken(jwtToken);
        });
      }
    });
  }

  public onLogout(): void {
    localStorage.removeItem('jwtToken');
    this.weekService.login = false;
    this.weekService.weeks = [];
    this.router.navigate(['/login']).catch(error => {
      console.error(error);
    });
  }
}
