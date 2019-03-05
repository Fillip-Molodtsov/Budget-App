import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    message: Message;

    constructor(private userService: UserService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.route.queryParams.subscribe((params: Params) => {
            if (params.permission) {
                this.showMessage('Вы вошли в систему', 'success');
            }
        });
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
        });
    }

    showMessage(text: String, type: String) {
        this.message.type = type;
        this.message.text = text;
    }

    onSubmit() {
        const data = this.form.value;
        this.userService.getUserByEmail(data.email).subscribe((user: User) => {
            if (user) {
                if (user.password === data.password) {
                    this.auth.login();
                    window.localStorage.setItem('user', JSON.stringify(user));
                    this.router.navigate(['/system', 'bill']);
                } else {
                    this.showMessage('Пароль введен некорректно', 'danger');
                }
            } else {
                this.showMessage('Пользователь не найден', 'danger');
            }
        });
    }
}
