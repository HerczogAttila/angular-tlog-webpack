import { Component } from '@angular/core';
import { UserRB } from '../shared/classes/backend/userRB';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { LoginService } from '../shared/services/login.service';

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})

export class LoginComponent {
    public userName: string;
    public password: string;

    constructor(private loginService: LoginService) {}

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
        this.loginService.logInRequest(user);
    }
}
