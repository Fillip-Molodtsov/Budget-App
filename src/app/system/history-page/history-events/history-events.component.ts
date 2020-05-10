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
    placeholder = 'Сума';
    parameter = 'amount';
    search = '';

    constructor() {
    }

    ngOnInit() {
    }

    changeFilter(filter: string) {
        const nameMap = {
            amount: 'Сума',
            date: 'Дата',
            category: 'Категорія',
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
        return event.type === 'income' ? 'Дохід' : 'Витрати';
    }

    getLabelType(event: MyEvent) {
        return event.type === 'income' ? 'success' : 'danger';
    }
}
