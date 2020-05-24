import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {User} from './models/user.model';
import {map} from 'rxjs/operators';
import {ApiService} from '../system/shared/services/api.service';
// Обробка інформації про користувача
@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    getUserByEmail(email: String): Observable<User> {
        return this.httpClient.get(`${this.apiService.getURLDataBase()}users?email=${email}`) // no need to response.json
            .pipe(map((user: User[]) => user[0] ? user[0] : undefined));
    }
    postUser(user: User): Observable<User> {
        // @ts-ignore
        return this.httpClient.post(`${this.apiService.getURLDataBase()}users`, user); // no need to response.json
    }
}
