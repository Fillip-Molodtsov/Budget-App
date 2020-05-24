import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user.model';
import {AuthService} from '../../../../shared/auth.service';
import {Router} from '@angular/router';
// Налаштування дати, часу та імені користувача на верхній панелі
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    date: Date = new Date();
    user: User;

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        setInterval(() => {
            this.date = new Date();
        }, 1000);
        this.user = JSON.parse(window.localStorage.getItem('user'));
    }

    onLogOut() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
