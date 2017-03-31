import { Component } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { WeekService } from '../shared/services/week.service';
import { PagerService } from '../shared/services/pager.service';

@Component({
    selector: 'my-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss'],
})

export class NavigationComponent {
    public login = LoginService;

    constructor(
        public weekService: WeekService,
        private pagerService: PagerService,
        private loginService: LoginService,
    ) {}

    public logOut(): void {
        this.loginService.logOut();
    }

    public setWeekStartIndex() {
        this.pagerService.refresh();
    }
}
