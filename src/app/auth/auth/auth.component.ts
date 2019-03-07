import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {logger} from 'codelyzer/util/logger';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {
    @HostBinding('@fade') a = true;

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
