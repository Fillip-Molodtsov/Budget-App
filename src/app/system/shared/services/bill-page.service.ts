import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {ApiService} from './api.service';
import {Bill} from '../models/bill.model';
// налаштування для сторінки рахунку
@Injectable({
    providedIn: 'root'
})
export class BillPageService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    getBill(): Observable<Bill> {
        // @ts-ignore
        return this.httpClient.get(`${this.apiService.getURLDataBase()}bill`);
    }
    patchBill(bill: Bill): Observable<Bill> {
        // @ts-ignore
        return this.httpClient.patch(`${this.apiService.getURLDataBase()}bill`, bill);
    }

    getCurrency(): Observable<any> {
        return this.httpClient
            .get(`${this.apiService.getURLFixer()}latest?access_key=${this.apiService.getFixer()}&symbols=USD,GBP&format=1`);
    }
}
