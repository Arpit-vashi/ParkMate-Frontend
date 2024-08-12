import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Dashboard', icon: 'fa-solid fa-landmark', routerLink: ['/'] },
                    { label: 'Booking Management', icon: 'fa-solid fa-clipboard-list', routerLink: ['/login'] },
                    { label: 'Vehicle Management', icon: 'fa-solid fa-car-rear', routerLink: ['/login'] },
                    { label: 'Parking Lot Management', icon: 'fa-solid fa-square-parking', routerLink: ['/parking-lot-management'] },
                    { label: 'Lost & Found', icon: 'fa-solid fa-person-circle-question', routerLink: ['/login'] },
                    { label: 'Addon Services', icon: 'fa-solid fa-bell-concierge', routerLink: ['/login'] },
                    { label: 'Offers Management', icon: 'fa-solid fa-percent', routerLink: ['/login'] },
                    { label: 'User Management', icon: 'fa-solid fa-user', routerLink: ['/user-management'] },
                    { label: 'Employee Management', icon: 'fa-solid fa-user-gear', routerLink: ['/login'] },
                ]
            },
        ];
    }
}
