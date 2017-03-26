import { Component, OnInit } from '@angular/core';
import { STATUS_CODE_UNAUTHORIZED, WeekService } from '../shared/services/week.service';
import { UserRB } from '../shared/classes/backend/userRB';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
    public userName: string;
    public password: string;

    public errorMessage: string;
    public error = false;

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
        if (!this.userName) {
            ErrorModalComponent.show('Missing user name!');
            return;
        }

        if (!this.password) {
            ErrorModalComponent.show('Missing password!');
            return;
        }

        let user = new UserRB(this.userName, this.password);

        this.weekService.authenticate(user)
            .subscribe(
                jwtToken => {
                    this.weekService.setJWTToken(jwtToken);
                    this.router.navigate(['/calendar']).catch(error => {
                        console.error(error);
                        }
                    );
                },
                error => {
                    if (error.status === STATUS_CODE_UNAUTHORIZED) {
                        ErrorModalComponent.show('Wrong password or user name!');
                    }
                }
            );
    }
}
