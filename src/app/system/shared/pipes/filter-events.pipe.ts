import {Pipe, PipeTransform} from '@angular/core';
import {MyEvent} from '../models/myEvent.model';

@Pipe({
    name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {

    transform(eventsAr: [MyEvent], search: string, filter: string): any {
        // @ts-ignore
        if (eventsAr.length === 0 || !search) {
            return eventsAr;
        }
        return eventsAr.filter(el => {
            const elc = JSON.parse(JSON.stringify(el));
            if (typeof elc[filter] === 'number') {
                elc[filter] += '';
            }
            if (filter === 'category') {
                elc[filter] = elc.categoryName;
            } else if (filter === 'type') {
                elc[filter] = elc[filter] === 'income' ? 'доход' : 'расход';
            }
            return elc[filter].toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    }

}
