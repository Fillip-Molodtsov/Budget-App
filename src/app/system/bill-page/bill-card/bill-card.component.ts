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
    rubli: number;
    constructor() {
    }

    ngOnInit() {
        this.dollar = this.bill.value * this.currency.rates['USD'];
        this.rubli = this.bill.value * this.currency.rates['RUB'];
    }

}
