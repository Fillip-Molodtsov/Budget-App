// форматування дати та часу
import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {

    transform(value: any, formatFrom: string = 'YYYY:MM:DD', formatTo: string = 'DD.MM.YYYY'): string {
        return moment(value, formatFrom).format(formatTo);
    }

}
