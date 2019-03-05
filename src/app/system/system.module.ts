import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system/system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {SharedModule} from '../shared/shared.module';
import {SideBarComponent} from './shared/components/side-bar/side-bar.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {DropDownProfileMenuDirective} from './shared/directives/drop-down-profile-menu.directive';
import {BillCardComponent} from './bill-page/bill-card/bill-card.component';
import {CurrencyCardComponent} from './bill-page/currency-card/currency-card.component';
import {BillPageService} from './shared/services/bill-page.service';
import {ApiService} from './shared/services/api.service';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import {CategoryService} from './shared/services/category.service';
import {MyEventService} from './shared/services/my-event.service';

@NgModule({
    declarations: [
        SystemComponent,
        BillPageComponent,
        HistoryPageComponent,
        PlanningPageComponent,
        RecordsPageComponent,
        SideBarComponent,
        HeaderComponent,
        DropDownProfileMenuDirective,
        BillCardComponent,
        CurrencyCardComponent,
        MomentPipe,
        AddEventComponent,
        AddCategoryComponent,
        EditCategoryComponent
    ],
    imports: [
        CommonModule,
        SystemRoutingModule,
        SharedModule
    ],
    providers: [BillPageService, ApiService, CategoryService,MyEventService]
})
export class SystemModule {
}
