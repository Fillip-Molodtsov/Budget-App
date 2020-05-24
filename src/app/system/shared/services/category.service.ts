import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';
// налаштування для сторінки категорії
@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    postCategory(category: Category): Observable<Category> {
        // @ts-ignore
        return this.httpClient.post(`${this.apiService.getURLDataBase()}categories`, category);
    }

    getCategories(): Observable<Category[]> {
        // @ts-ignore
        return this.httpClient.get(`${this.apiService.getURLDataBase()}categories`);
    }

    getCategoryByID(id: number): Observable<Category> {
        // @ts-ignore
        return this.httpClient.get(`${this.apiService.getURLDataBase()}categories/${id}`);
    }

    putCategory(category: Category): Observable<Category> {
        // @ts-ignore
        return this.httpClient.put(`${this.apiService.getURLDataBase()}categories/${category.id}`, category);
    }
}
