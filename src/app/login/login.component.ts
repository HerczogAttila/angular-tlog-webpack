import { Component, OnInit } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { UserRB } from '../shared/classes/backend/userRB';
import { Router } from '@angular/router';

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
    userName: string;
    password: string;

    constructor(
        private weekService: WeekService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        if (localStorage.getItem('jwtToken')) {
            this.router.navigate(['/calendar']).catch(error => {
                console.error(error);
            });
        }
    }

    public onLogin(): void {
        let user = new UserRB();
        user.name = this.userName;
        user.password = this.password;

        this.weekService.authenticate(user).subscribe(jwtToken => {
            this.weekService.setJWTToken(jwtToken);
            this.router.navigate(['/calendar']).catch(error => {
                console.error(error);
            });
        });
    }
}
