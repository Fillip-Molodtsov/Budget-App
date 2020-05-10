import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';

@Component({
    selector: 'app-bill-card',
    templateUrl: './bill-card.component.html',
    styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
    @Input('bill') bill: Bill;
    @Input('currency') currency: any;
    dollar: number;
    gbp: number;
    constructor() {
    }

    ngOnInit() {
        this.dollar = this.bill.value * this.currency.rates['USD'];
        this.gbp = this.bill.value * this.currency.rates['GBP'];
    }

}
