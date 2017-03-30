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
    constructor(
        public weekService: WeekService,
        private pagerService: PagerService,
        private loginService: LoginService,
    ) {}

    public logOut(): void {
        this.loginService.logOut();
    }

    public getUserName(): string {
        return LoginService.getUserName();
    }

    public isLogged(): boolean {
        return LoginService.isLogged();
    }

    public setWeekStartIndex() {
        this.pagerService.refresh();
    }
}
