import { Component } from '@angular/core';
import { LoginService } from '../shared/services/login.service';

@Component({
    selector: 'my-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss'],
})

export class NavigationComponent {
    constructor(private loginService: LoginService) {}

    public logOut(): void {
        this.loginService.logOut();
    }

    public getUserName(): string {
        return LoginService.getUserName();
    }

    public isLogged(): boolean {
        return LoginService.isLogged();
    }
}
