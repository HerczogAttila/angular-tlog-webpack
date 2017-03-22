import { Component } from '@angular/core';

import '../style/app.scss';
import { WeekService } from './shared/services/week.service';
import { Observable } from 'rxjs';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Time logger angular webpack';

  constructor(
      public weekService: WeekService,
      public translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    translate.use(navigator.language);

    Observable.interval(24000).subscribe(() => {
      if (localStorage.getItem('jwtToken')) {
        this.weekService.refresh().subscribe(jwtToken => {
          this.weekService.setJWTToken(jwtToken);
        });
      }
    });
  }
}
