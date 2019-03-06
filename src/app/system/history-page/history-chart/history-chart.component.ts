import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-history-chart',
    templateUrl: './history-chart.component.html',
    styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
    @Input() data;
    colorScheme = {
        domain: ['#FC440F', '#1EFFBC', '#2DE1FC', '#F7CB15', '#FF0022']
    };

}
