import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service'; // Adjust the path as necessary
import { UserResponse } from '../../../models/user-management/user-response.model'; // Adjust the path as necessary

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  users: UserResponse[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers(this.currentPage, this.pageSize);
  }

  fetchUsers(page: number, size: number): void {
    this.userService.getAllUsers(page, size).subscribe({
      next: (response) => {
        this.users = response.content; // Adjust according to your API response structure
        this.totalPages = response.totalPages; // Assuming total pages are sent in response
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchUsers(this.currentPage, this.pageSize);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchUsers(this.currentPage, this.pageSize);
    }
  }
}