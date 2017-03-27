import { Component } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { Router } from '@angular/router';
import { NetworkService } from '../shared/services/network.service';

@Component({
    selector: 'my-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss'],
})

export class NavigationComponent {

    constructor(
        public weekService: WeekService,
        private networkService: NetworkService,
        private router: Router,
    ) {}

    public onLogout(): void {
        localStorage.removeItem('jwtToken');
        this.networkService.login = false;
        this.weekService.clear();
        this.router.navigate(['/login']).catch(error => {
            console.error(error);
        });
    }
}
