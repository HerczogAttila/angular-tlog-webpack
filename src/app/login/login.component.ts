import { Component, OnInit } from '@angular/core';
import { UserRB } from '../shared/classes/backend/userRB';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NetworkService, STATUS_CODE_UNAUTHORIZED } from '../shared/services/network.service';

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent implements OnInit {
    public userName: string;
    public password: string;

    public error = false;

    constructor(
        private networkService: NetworkService,
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
        this.networkService.authenticate(user)
            .subscribe(
                jwtToken => this.navigateCalendar(jwtToken),
                error => {
                    if (error.status === STATUS_CODE_UNAUTHORIZED) {
                        ErrorModalComponent.show('Wrong password or user name!');
                    }
                }
            );
    }

    private navigateCalendar(jwtToken: string): void {
        this.networkService.setJWTToken(jwtToken);
        this.router.navigate(['/calendar'])
            .catch(error => {
                console.error(error);
            });
    }
}
