import { UserResponse } from './../models/user-management/user-response.model';
import { UserRequest } from './../models/user-management/user-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pageable } from '../models/pageable/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  // Get all users with pagination
  getAllUsers(page: number = 0, size: number = 10, sortBy?: string, sortOrder?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (sortOrder) {
      params = params.set('sortOrder', sortOrder);
    }

    return this.http.get<any>(this.baseUrl, { params });
  }
  // Get user by ID
  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/${id}`);
  }

  // Create a new user (use UserRequest for sending data)
  createUser(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl, user);
  }

  // Update an existing user (use UserRequest for sending data)
  updateUser(id: number, user: UserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.baseUrl}/${id}`, user);
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get user by username
  getUserByUsername(username: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/username/${username}`);
  }

  // Get user by email
  getUserByEmail(email: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/email/${email}`);
  }

  // Get user by mobile number
  getUserByMobileNo(mobileNo: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/mobile/${mobileNo}`);
  }

  // Get user by name
  getUserByName(name: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/name/${name}`);
  }

  // Check if username exists
  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/username/${username}`);
  }

  // Check if mobile number exists
  checkMobileExists(mobileNo: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/mobile/${mobileNo}`);
  }

  // Check if email exists
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/email/${email}`);
  }

  searchUsers(searchTerm: string, page: number = 0, size: number = 10): Observable<Pageable<UserResponse>> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Pageable<UserResponse>>(`${this.baseUrl}/search`, { params });
  }
}
