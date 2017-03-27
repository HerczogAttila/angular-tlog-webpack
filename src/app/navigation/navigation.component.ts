import { Component } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss'],
})

export class NavigationComponent {

    constructor(
        public weekService: WeekService,
        private router: Router,
    ) {}

    public onLogout(): void {
        localStorage.removeItem('jwtToken');
        this.weekService.login = false;
        this.weekService.clear();
        this.router.navigate(['/login']).catch(error => {
            console.error(error);
        });
    }
}
