import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration } from 'models';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Ajoute un nouvel utilisateur
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm, { static: false })
    ngForm: NgForm;

    model = new UserRegistration();

    constructor(
        private registrationService: RegistrationService,
        private messageService: NzMessageService,
        private router: Router
    ) { }

    register() {
        if (this.ngForm.form.invalid) {
            return this.messageService.error("Invalid form");
        }
        else if (!this.model.username || this.model.username === "") {
            return this.messageService.error("You must choose a username");
        }
        else if (!this.model.password || this.model.password === "") {
            return this.messageService.error("You must choose a password");
        }
        else {
            this.registrationService.usernameExists(this.model.username).then( value => {
                if (value === true) {
                    return this.messageService.error("This username already exist");
    
                } else {
                    if (this.registrationService.register(this.ngForm.form.value)) {
                        this.router.navigate(['/login']);
                    }
                    else {
                        return this.messageService.error('Something went wrong');
                    }
                }
            });  
        }
    }
}
