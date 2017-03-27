import { Component } from '@angular/core';

import '../style/app.scss';
import { Observable } from 'rxjs';
import { TranslateService } from 'ng2-translate';
import { NetworkService } from './shared/services/network.service';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Time logger angular webpack';

  constructor(
      public networkService: NetworkService,
      public translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    translate.use(navigator.language);

    this.refreshToken();
    Observable.interval(240000).subscribe(() => {
      this.refreshToken();
    });
  }

  private refreshToken(): void {
    if (localStorage.getItem('jwtToken')) {
      this.networkService.refresh().subscribe(jwtToken => {
        this.networkService.setJWTToken(jwtToken);
      });
    }
  }
}
