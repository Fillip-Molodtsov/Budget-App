import {Component, OnInit} from '@angular/core';
import {MyEventService} from '../../shared/services/my-event.service';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {MyEvent} from '../../shared/models/myEvent.model';
import {Category} from '../../shared/models/category.model';

@Component({
    selector: 'app-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {
    sub1: Subscription;
    event: MyEvent;
    categoryName: String;
    isLoaded = false;

    constructor(private myEventService: MyEventService,
                private  categoryService: CategoryService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .pipe(mergeMap((params: Params) => this.myEventService.getEventsByID(+params['id'])))
            .pipe(mergeMap((event: MyEvent) => {
                this.event = event;
                return this.categoryService.getCategoryByID(event.category);
            })).subscribe((category: Category) => {
            this.categoryName = category.name;
            this.isLoaded = true;
        });
    }

}
