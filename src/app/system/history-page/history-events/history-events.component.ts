import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {MyEvent} from '../../shared/models/myEvent.model';

@Component({
    selector: 'app-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
    @Input() categories: Category[];
    @Input() events: MyEvent[];
    placeholder = 'Сумма';
    parameter = 'amount';
    search = '';

    constructor() {
    }

    ngOnInit() {
    }

    changeFilter(filter: string) {
        const nameMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип',
        };
        this.placeholder = nameMap[filter];
        this.parameter = filter;
    }

    getCategoryName(event: MyEvent) {
        event.categoryName = this.categories.find(c => c.id === event.category).name;
        return event.categoryName;
    }

    getType(event: MyEvent) {
        return event.type === 'income' ? 'Доход' : 'Расход';
    }

    getLabelType(event: MyEvent) {
        return event.type === 'income' ? 'success' : 'danger';
    }
}
