import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {Target} from '@angular/compiler';

@Component({
    selector: 'app-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {
    @Output() filterCancel = new EventEmitter<any>();
    @Output() filterApply = new EventEmitter<any>();
    @Input() categories: Category[];
    categoryType = [];
    eventType = ['income', 'outcome'];
    selectedPeriod = 'd';
    periodTypes = [
        {value: 'd', label: 'день'},
        {value: 'w', label: 'тиждень'},
        {value: 'M', label: 'місяць'}
    ];
    eventTypes = [
        {value: 'income', label: 'дохід'},
        {value: 'outcome', label: 'витрати'}
    ];

    constructor() {
    }

    ngOnInit() {
        this.categories.forEach(el => this.categoryType.push(el.id + ''));
    }

    onParChange(array: any[], {checked, value}) {
        if (checked && (array.findIndex(el => el === value) === -1)) {
            array.push(value);
        } else if (!checked) {
            array = array.filter(el => el !== value);
        }
        return array;
    }

    onCategoryChange(target) {
        this.categoryType = this.onParChange(this.categoryType, target);
    }

    onEventTypeChange(target) {
        this.eventType = this.onParChange(this.eventType, target);
    }

    onCancel() {
        this.selectedPeriod = 'd';
        this.eventType = [];
        this.categoryType = [];
        this.filterCancel.emit(null);
    }

    onApply() {
        const applyData = {
            period: this.selectedPeriod,
            types: this.eventType,
            categories: this.categoryType
        };
        this.filterApply.emit(applyData);
    }
}
