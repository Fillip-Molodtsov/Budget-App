import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    form: FormGroup;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email], this.occupiedEmail.bind(this)),
            'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
            'name': new FormControl(null, [Validators.required]),
            'agree': new FormControl(null, [Validators.requiredTrue])
        });
    }

    occupiedEmail(control: FormControl): Promise<any> {
        return new Promise((res, rej) => {
            this.userService.getUserByEmail(control.value)
                .subscribe((user: User) => {
                    if (user) {
                        res({exist: true});
                    } else {
                        res(null);
                    }
                });
        });
    }

    onSubmit() {
        const {name, password, email} = this.form.value;
        const user = new User(email, password, name);
        this.userService.postUser(user)
            .subscribe(() => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        permission: true // todo redirect to bill-page
                    }
                });
            });
    }

}
