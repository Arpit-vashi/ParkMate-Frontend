import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { ParkingLotManagementComponent } from './pages/parking-lot-management/parking-lot-management.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';


@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        { path: '', component:  DashboardComponent},
                        { path: 'parking-lot-management', component:  ParkingLotManagementComponent},
                        { path: 'add-user', component:  AddUserComponent},
                        { path: 'list-user', component:  ListUserComponent},


                    ],   
                },
                {
                    path: 'Login',
                    component: LoginPageComponent,
                },
                {
                    path: 'Register',
                    component: RegisterPageComponent,
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
