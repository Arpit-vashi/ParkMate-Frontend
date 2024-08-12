import { UserManagementService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserResponse } from './../../models/user-management/user-response.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: UserResponse[] = [];

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userManagementService.getAllUsers().subscribe(
      (response: UserResponse[]) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
