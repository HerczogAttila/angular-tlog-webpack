import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    public canActivate(): boolean {
        if (LoginService.isLogged()) {
            return true;
        }

        this.router.navigate(['/login'])
            .catch(error => {
                console.error(error);
            });
        return false;
    }
}
