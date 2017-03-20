import { Component, OnInit } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { UserRB } from '../shared/classes/backend/userRB';
import { Router } from '@angular/router';

const STATUS_CODE_NOT_MODIFIED = 304;

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
    userName: string;
    password: string;

    isExistUser = false;

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

    public onRegister(): void {
        let user = new UserRB();
        user.name = this.userName;
        user.password = this.password;

        this.weekService.registering(user)
            .subscribe();
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

    public getExistUserMessageVisibility(): string {
        if (this.isExistUser) {
            return 'visible';
        } else {
            return 'hidden';
        }
    }

    public onUserNameChanged(): void {
        this.weekService.isExistUserName(this.userName)
            .map(res => res)
            .subscribe(
                () => { this.isExistUser = false; },
                (err) => {
                    if (err.status === STATUS_CODE_NOT_MODIFIED) {
                        this.isExistUser = true;
                    }
                }
            );
    }
}
