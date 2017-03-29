import { Injectable } from '@angular/core';
import { NetworkService, STATUS_CODE_UNAUTHORIZED } from './network.service';
import { UserRB } from '../classes/backend/userRB';
import { WeekService } from './week.service';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../../modals/error-modal/error-modal.component';

@Injectable()
export class LoginService {
    public static isLogged(): boolean {
        return !!localStorage.getItem('jwtToken');
    }

    public static getUserName(): string {
        return localStorage.getItem('userName');
    }

    constructor(
        private networkService: NetworkService,
        private weekService: WeekService,
        private router: Router,
    ) {}

    public refreshToken() {
        this.networkService.refresh()
            .subscribe(
                jwtToken => {
                    this.setJwtToken(jwtToken);
                },
                error => {
                    console.log(error);
                    this.logOut();
                    ErrorModalComponent.show('Authorization problem');
                }
            );
    }

    public logOut(): void {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userName');
        this.weekService.clear();
        this.router.navigate(['/login'])
            .catch(error => {
                console.error(error);
            });
    }

    public logInRequest(user: UserRB): void {
        this.networkService.authenticate(user)
            .subscribe(
                jwt => {
                    this.logIn(user.name, jwt);
                },
                error => {
                    if (error.status === STATUS_CODE_UNAUTHORIZED) {
                        ErrorModalComponent.show('Wrong password or user name!');
                    }
                }
            );
    }

    private logIn(name: string, jwt: string): void {
        localStorage.setItem('userName', name);
        this.setJwtToken(jwt);
        this.router.navigate(['/calendar'])
            .catch(error => {
                console.error(error);
            });
    }

    private setJwtToken(jwt: string): void {
        localStorage.setItem('jwtToken', jwt);
        this.networkService.refreshHeader();
    }
}
