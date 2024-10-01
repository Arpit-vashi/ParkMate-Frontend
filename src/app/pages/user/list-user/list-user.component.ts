import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserResponse } from '../../../models/user-management/user-response.model';
import { Pageable } from '../../../models/pageable/pageable.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  sidebarVisible: boolean = false;
  searchValue: string | undefined = '';
  searchSubject: Subject<string> = new Subject<string>();
  currentSortField: string = '';
  currentSortOrder: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log('OnInit: Fetching users...');
    this.fetchUsers(this.currentPage, this.pageSize);
    
    // Subscribe to search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.onSearch(searchTerm);
    });
  }

  fetchUsers(page: number, size: number, sortBy?: string, sortOrder?: 'asc' | 'desc', searchTerm?: string): void {
    console.log('Fetching users: page=', page, ', size=', size, ', sortBy=', sortBy, ', sortOrder=', sortOrder);
    this.loading = true;

    if (searchTerm && searchTerm.trim()) {
      console.log('Searching for:', searchTerm.trim());
      this.userService.searchUsers(searchTerm.trim(), page, size).subscribe({
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
    this.fetchUsers(this.currentPage, this.pageSize, this.currentSortField, this.currentSortOrder, this.searchValue);
  }

  onSearch(searchTerm: string): void {
    console.log('Search initiated for:', searchTerm);
    this.currentPage = 0; // Reset to first page on search
    this.fetchUsers(this.currentPage, this.pageSize, this.currentSortField, this.currentSortOrder, searchTerm);
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
    this.fetchUsers(this.currentPage, this.pageSize, this.currentSortField, this.currentSortOrder, this.searchValue);
  }

  navigateToUpdateUser(userId: number): void {
    this.router.navigate(['/update-user', userId]);
  }
}
