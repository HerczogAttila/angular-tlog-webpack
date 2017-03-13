import { Component } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { UserRB } from '../shared/classes/backend/userRB';

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent {
    constructor(private weekService: WeekService) {}

    public onRegister(userName: string, password: string): void {
        let user = new UserRB();
        user.name = userName;
        user.password = password;

        this.weekService.registering(user).subscribe();
    }

    public onLogin(userName: string, password: string): void {
        let user = new UserRB();
        user.name = userName;
        user.password = password;

        this.weekService.authenticate(user).subscribe(jwtToken => {
            console.log(jwtToken);
        });
    }
}
