import { Component } from '@angular/core';
import { UserRB } from '../shared/classes/backend/userRB';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { NetworkService, STATUS_CODE_NOT_MODIFIED } from '../shared/services/network.service';
import { LoginService } from '../shared/services/login.service';

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

export class RegisterComponent {
    public userName: string;
    public password: string;

    public isExistUser = false;
    public errorMessage: string;

    constructor(
        private networkService: NetworkService,
        private loginService: LoginService,
    ) {}

    public onRegister(): void {
        if (!this.userName) {
            ErrorModalComponent.show(MISSING_USER);
            return;
        }

        if (!this.password) {
            ErrorModalComponent.show(MISSING_PASSWORD);
            return;
        }

        let user = new UserRB(this.userName, this.password);
        this.networkService.registering(user)
            .subscribe(
                () => {
                    this.loginService.logInRequest(user);
                },
                (error) => {
                    if (error.status === STATUS_CODE_NOT_MODIFIED) {
                        ErrorModalComponent.show(EXIST_USER);
                    }
                }
            );
    }

    public onUserNameChanged(): void {
        if (!this.userName) {
            this.errorMessage = MISSING_USER;
            return;
        }

        this.networkService.isExistUserName(this.userName)
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
