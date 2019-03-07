import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [LoginComponent, RegistrationComponent, AuthComponent],
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule {
}
