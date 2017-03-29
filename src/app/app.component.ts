import '../style/app.scss';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from 'ng2-translate';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Time logger angular webpack';

  constructor(
      private translate: TranslateService,
      private loginService: LoginService,
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use(navigator.language.split('-')[0]);

    this.refreshToken();
    Observable.interval(240000)
        .subscribe(() => {
            this.refreshToken();
        });
  }

  private refreshToken(): void {
    if (LoginService.isLogged()) {
      this.loginService.refreshToken();
    }
  }
}
