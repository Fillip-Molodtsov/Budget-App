import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';
// редагування категорій
@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    @Input() categories: Category[];
    @Output() categoryEdit = new EventEmitter<Category>();
    categoryCurrentID;
    currentCategory;
    message: Message;
    sub1: Subscription;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.message = new Message('success', '');
        this.currentCategory = this.categories[0];
        this.categoryCurrentID = this.currentCategory ? this.currentCategory.id : 0;
    }

    onChange() {
        this.currentCategory = this.categories.find(cat => cat.id === +this.categoryCurrentID);
    }

    onSubmit(form: NgForm) {
        let {name, capacity} = form.value;
        if (capacity <= 0) {
            capacity = 1;
        }
        const category = new Category(name, +capacity, this.categoryCurrentID);
        this.sub1 = this.categoryService.putCategory(category).subscribe(res => {
            this.categoryEdit.emit(res);
            this.message.text = 'Категорія відредагована';
            window.setTimeout(() => this.message.text = '', 1000);
        });
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }
}
