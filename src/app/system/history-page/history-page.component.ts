import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../shared/models/category.model';
import {MyEvent} from '../shared/models/myEvent.model';
import {CategoryService} from '../shared/services/category.service';
import {MyEventService} from '../shared/services/my-event.service';
import {forkJoin, Subscription} from 'rxjs';
import * as moment from 'moment';
// Сторінказ історією
@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
    categories: Category[];
    events: MyEvent[];
    eventsToFilter: MyEvent[];
    isLoaded = false;
    data = [];
    isFilterVisible = false;
    sub1: Subscription;

    constructor(private categoryService: CategoryService, private myEventService: MyEventService) {
    }

    ngOnInit() {
        this.sub1 = forkJoin([
            this.categoryService.getCategories(),
            this.myEventService.getEvents()
        ]).subscribe(res => {
            this.categories = res[0];
            this.events = res[1];
            this.resetEventFilter();
            this.calculateData();
            this.isLoaded = true;
        });
    }

    public resetEventFilter() {
        this.eventsToFilter = this.events.slice();
    }

    calculateData = () => {
        this.data = [];
        this.categories.forEach(cat => {
            const catEvents = this.eventsToFilter.filter(e => e.category === cat.id && e.type === 'outcome');
            if (catEvents) {
                this.data.push({
                    name: cat.name,
                    value: catEvents.reduce((total, e) => {
                        total += e.amount;
                        return total;
                    }, 0)
                });
            }
        });
    };

    private toggleFilterVisibility(b: boolean) {
        this.isFilterVisible = b;
    }

    public openFilter() {
        this.toggleFilterVisibility(true);
    }

    public onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.resetEventFilter();
        this.isLoaded = false;
        this.calculateData();
        this.isLoaded = true;
    }

    public onFilterApply(data) {
        this.toggleFilterVisibility(false);
        this.isLoaded = false;
        this.resetEventFilter();
        this.eventsToFilter =
            this.eventsToFilter
                .filter(el => data.categories.indexOf(el.category.toString()) !== -1)
                .filter(el => data.types.indexOf(el.type) !== -1)
                .filter(el => {
                    if (!el) {
                        return false;
                    }
                    const startPeriod = moment().startOf(data.period);
                    const endPeriod = moment().endOf(data.period);
                    const then = moment(el.date, 'DD.MM.YYYY HH:mm:ss');
                    return then.isBetween(startPeriod, endPeriod);
                });
        this.calculateData();
        this.isLoaded = true;
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

}
