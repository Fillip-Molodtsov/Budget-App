import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillPageService} from '../shared/services/bill-page.service';
import {forkJoin, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-bill-page',
    templateUrl: './bill-page.component.html',
    styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    subscription2: Subscription;
    bill: Bill;
    currency: any;
    isLoaded = false;

    constructor(private billService: BillPageService) {
    }

    ngOnInit() {
        this.subscription = forkJoin([this.billService.getBill(), this.billService.getCurrency()])
            .pipe(delay(300))
            .subscribe(res => {
                this.bill = res[0];
                this.currency = res[1];
                this.isLoaded = true;
            });
    }

    onRefresh() {
        this.isLoaded = false;
        this.subscription2 = this.billService.getCurrency().subscribe(res => {
            this.currency = res;
            this.isLoaded = true;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
