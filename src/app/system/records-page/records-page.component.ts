import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/models/category.model';
import {CategoryService} from '../shared/services/category.service';

@Component({
    selector: 'app-records-page',
    templateUrl: './records-page.component.html',
    styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
    categories: Category[];
    isLoaded = false;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(res => {
            this.categories = res;
            this.isLoaded = true;
        });
    }

    onCategoryAdd(category: Category) {
        this.categories.push(category);
    }

    onCategoryEdit(category: Category) {
        const index = this.categories.findIndex(el => el.id === category.id);
        this.categories[index] = category;
    }
}
