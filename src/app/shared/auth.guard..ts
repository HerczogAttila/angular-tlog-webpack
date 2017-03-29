import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NetworkService } from './services/network.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private networkService: NetworkService,
    ) {}

    public canActivate(): boolean {
        if (this.networkService.login) {
            return true;
        }

        this.router.navigate(['/login'])
            .catch(error => {
                console.error(error);
            });
        return false;
    }
}
