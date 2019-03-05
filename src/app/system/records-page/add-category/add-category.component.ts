import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
    @Output() categoryAdd = new EventEmitter<Category>();
    sub1: Subscription;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        let {name, capacity} = form.value;
        if (capacity <= 0) {
            capacity = 1;
        }
        const category = new Category(name, +capacity);
        this.sub1 = this.categoryService.postCategory(category).subscribe(res => {
            form.reset();
            form.form.patchValue({capacity: 1});
            this.categoryAdd.emit(res);
        });
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }
}
