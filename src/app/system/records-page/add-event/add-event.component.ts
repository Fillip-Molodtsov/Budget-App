import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {MyEvent} from '../../shared/models/myEvent.model';
import * as moment from 'moment';
import {BillPageService} from '../../shared/services/bill-page.service';
import {Subscription} from 'rxjs';
import {Message} from '../../../shared/models/message.model';
import {MyEventService} from '../../shared/services/my-event.service';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
    @Input() categories: Category[];
    types = [
        {
            value: 'income',
            label: 'Дохід'
        },
        {
            value: 'outcome',
            label: 'Витрати'
        }
    ];
    message: Message;
    sub1: Subscription;
    sub2: Subscription;

    constructor(private billService: BillPageService, private myEventService: MyEventService) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
    }

    showMessage(text: string, type: string) {
        this.message.type = type;
        this.message.text = text;
        window.setTimeout(() => this.message.text = '', 2000);
    }

    onSubmit(form: NgForm) {
        let {type, description, amount, category} = form.value;
        if (amount <= 0) {
            amount = 1;
        }
        const event =
            new MyEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
        this.sub1 = this.billService.getBill().subscribe(bill => {
            if (type === 'income') {
                bill.value = amount + bill.value;
            } else {
                if (amount > bill.value) {
                    this.showMessage(`Ваш рахунок менший, ніж сума, яка віднімається, на${amount - bill.value} ${bill.currency}`, 'danger');
                    return;
                } else {
                    bill.value = bill.value - amount;
                }
            }
            this.billService.patchBill(bill)
                .pipe(mergeMap(() => this.myEventService.postEvent(event)))
                .subscribe(() => {
                    this.showMessage('Подію опрацьовано', 'success');
                    form.setValue({
                        category,
                        amount: 0,
                        description: ' ',
                        type: 'income'
                    });
                });
        });
    }
}
