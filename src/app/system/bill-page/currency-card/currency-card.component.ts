import {Component, Input, OnInit} from '@angular/core';
// поточний рахунок у різних валютах
@Component({
    selector: 'app-currency-card',
    templateUrl: './currency-card.component.html',
    styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
    @Input() currency: any;
    currencies = ['USD', 'GBP'];

    constructor() {
    }

    ngOnInit() {
    }

}
