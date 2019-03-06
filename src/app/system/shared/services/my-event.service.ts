import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyEvent} from '../models/myEvent.model';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class MyEventService {

    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    postEvent(event: MyEvent): Observable<MyEvent> {
        // @ts-ignore
        return this.httpClient.post(`${this.apiService.getURLDataBase()}events`, event);
    }

    getEvents(): Observable<MyEvent[]> {
        // @ts-ignore
        return this.httpClient.get(`${this.apiService.getURLDataBase()}events`);
    }

    getEventsByID(id: number): Observable<MyEvent> {
        // @ts-ignore
        return this.httpClient.get(`${this.apiService.getURLDataBase()}events/${id}`);
    }
}
