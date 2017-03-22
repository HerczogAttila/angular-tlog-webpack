import { Component, OnInit } from '@angular/core';
import { STATUS_CODE_NOT_MODIFIED, WeekService } from '../shared/services/week.service';
import { UserRB } from '../shared/classes/backend/userRB';
import { Router } from '@angular/router';

const EXIST_USER = 'Existing user name!';
const MISSING_USER = 'Missing user name!';
const MISSING_PASSWORD = 'Missing password!';

@Component({
    selector: 'my-register',
    templateUrl: 'register.component.html',
    styleUrls: [
        '../login/login.component.scss',
        'register.component.scss'
    ],
})

export class RegisterComponent implements OnInit {
    public userName: string;
    public password: string;

    public isExistUser = false;
    public errorMessage: string;

    constructor(
        private weekService: WeekService,
        private router: Router,
    ) {}

    public ngOnInit(): void {
        if (localStorage.getItem('jwtToken')) {
            this.router.navigate(['/calendar'])
                .catch(error => {
                console.error(error);
            });
        }
    }

    public onRegister(): void {
        if (!this.userName) {
            this.errorMessage = MISSING_USER;
            return;
        }

        if (!this.password) {
            this.errorMessage = MISSING_PASSWORD;
            return;
        }

        let user = new UserRB(this.userName, this.password);
        this.weekService.registering(user)
            .subscribe(
                () => {
                    this.weekService.authenticate(user)
                        .subscribe(jwtToken => {
                            this.weekService.setJWTToken(jwtToken);
                            this.router.navigate(['/calendar']).catch(error => {
                                console.error(error);
                            });
                        });
                },
                (error) => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        this.errorMessage = EXIST_USER;
                    }
                }
            );
    }

    public onUserNameChanged(): void {
        if (!this.userName) {
            this.errorMessage = MISSING_USER;
            return;
        }

        this.weekService.isExistUserName(this.userName)
            .map(res => res)
            .subscribe(
                () => {
                    this.errorMessage = '';
                },
                (error) => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        this.errorMessage = EXIST_USER;
                    }
                }
            );
    }
}
