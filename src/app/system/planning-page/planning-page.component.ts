import {Component, OnInit} from '@angular/core';
import {BillPageService} from '../shared/services/bill-page.service';
import {CategoryService} from '../shared/services/category.service';
import {MyEventService} from '../shared/services/my-event.service';
import {Bill} from '../shared/models/bill.model';
import {Category} from '../shared/models/category.model';
import {MyEvent} from '../shared/models/myEvent.model';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {
    bill: Bill;
    categories: Category[];
    myevents: MyEvent[];
    isLoaded = false;

    constructor(private billService: BillPageService,
                private categoryService: CategoryService,
                private myEventService: MyEventService) {
    }

    ngOnInit() {
        forkJoin([
            this.billService.getBill(),
            this.categoryService.getCategories(),
            this.myEventService.getEvents()
        ]).subscribe((res: [Bill, Category[], MyEvent[]]) => {
            this.bill = res[0];
            this.categories = res[1];
            this.myevents = res[2];
            this.isLoaded = true;
        });
    }

    getCategoryOutcome(category: Category): number {
        const cat = this.myevents.filter(e => e.category === category.id && e.type === 'outcome');
        return cat.reduce((total: number, e) => {
            total += e.amount;
            return total;
        }, 0);
    }

    private getPercentage(c: Category): number {
        const per = 100 * this.getCategoryOutcome(c) / c.capacity;
        if (per > 100) {
            return 100;
        } else {
            return per;
        }
    }

    getPercentageString(c: Category): string {
        return this.getPercentage(c) + '%';
    }

    getLeftOver(c: Category) {
        return Math.abs(c.capacity - this.getCategoryOutcome(c));
    }

    getColorBar(c: Category) {
        const per = this.getPercentage(c);
        return per < 60 ? 'success' : per === 100 ? 'danger' : 'warning';
    }

    returnLeftOverString(c: Category): string {
        return this.getPercentage(c) === 100 ? 'перевикористав' : 'залишилося';
    }
}
