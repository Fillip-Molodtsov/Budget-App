import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {logger} from 'codelyzer/util/logger';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const snapshot = this.route.snapshot;
        // @ts-ignore
        if (snapshot._routerState.url === '/registration') {
            this.router.navigate(['/registration']);
        } else {
            this.router.navigate(['/login']);
        }
    }

}
