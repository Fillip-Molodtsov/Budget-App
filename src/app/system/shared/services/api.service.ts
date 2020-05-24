import {Injectable} from '@angular/core';
// налаштування api
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private fixer_key = '18c5a50e5b981465245e3f28db438d15';
    private url_database = 'http://localhost:3000/';
    private urlFixer = 'http://data.fixer.io/api/';

    getFixer(): String {
        return this.fixer_key;
    }

    getURLFixer(): String {
        return this.urlFixer;
    }

    getURLDataBase(): String {
        return this.url_database;
    }
}
