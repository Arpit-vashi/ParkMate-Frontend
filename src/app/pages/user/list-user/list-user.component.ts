import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserResponse } from '../../../models/user-management/user-response.model';
import { Pageable } from '../../../models/pageable/pageable.model';

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
  loading: boolean = true;
  searchValue: string | undefined = '';
  currentSortField: string = '';
  currentSortOrder: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('OnInit: Fetching users...');
    // Fetch all users without any filters or sorting on initial load
    this.fetchUsers(this.currentPage, this.pageSize);
  }

  fetchUsers(page: number, size: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): void {
    console.log('Fetching users: page=', page, ', size=', size, ', sortBy=', sortBy, ', sortOrder=', sortOrder);
    this.loading = true;

    if (this.searchValue && this.searchValue.trim()) {
      console.log('Searching for:', this.searchValue.trim());
      this.userService.searchUsers(this.searchValue.trim(), page, size).subscribe({
        next: (response: Pageable<UserResponse>) => {
          console.log('Search results:', response);
          this.users = response.content;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          this.loading = false;
        },
      });
    } else {
      console.log('Fetching all users...');
      // Call the API with optional sorting parameters (they can be undefined)
      this.userService.getAllUsers(page, size, sortBy, sortOrder).subscribe({
        next: (response) => {
          console.log('All users:', response);
          this.users = response.content;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
          this.loading = false;
        },
      });
    }
  }

  onPageChange(event: any): void {
    console.log('Page changed: page=', event.page, ', rows=', event.rows);
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.fetchUsers(this.currentPage, this.pageSize, this.currentSortField, this.currentSortOrder);
  }

  onSearch(): void {
    console.log('Search initiated...');
    this.currentPage = 0;
    this.fetchUsers(this.currentPage, this.pageSize, this.currentSortField, this.currentSortOrder);
  }

  clear(table: any): void {
    console.log('Clearing search...');
    table.clear();
    this.searchValue = '';
    this.fetchUsers(this.currentPage, this.pageSize);
  }

  changeSort(sortField: string): void {
    if (this.currentSortField === sortField) {
      this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortField = sortField;
      this.currentSortOrder = 'asc';
    }

    this.currentPage = 0;
    this.fetchUsers(this.currentPage, this.pageSize, this.currentSortField, this.currentSortOrder);
  }
}
