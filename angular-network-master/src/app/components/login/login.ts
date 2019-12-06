import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'models';
import { AuthenticationService } from '../../services/index';

/**
 * Connecte un utilisateur à la plateforme
 */
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    model = new UserLogin();
    failed = false;
    fieldEmpty = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    async login() {
        this.failed = false;
        this.fieldEmpty = false;
        if (!this.model.username || this.model.username === "" || !this.model.password || this.model.password === "") {
            return this.fieldEmpty = true;
        }

        try {
            await this.authService.authenticate(this.model);
            this.router.navigate(["/"]);
        }
        catch (e) {
            return this.failed = true;
        }
    }
}
