import { Component, OnInit } from '@angular/core';
import { WeekService } from '../shared/services/week.service';
import { UserRB } from '../shared/classes/backend/userRB';
import { Router } from '@angular/router';

const STATUS_CODE_NOT_MODIFIED = 304;

@Component({
    selector: 'my-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss'],
})

export class RegisterComponent implements OnInit {
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
