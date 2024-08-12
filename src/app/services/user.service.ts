import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from "./../models/user-management/user-request.model";
import { UserResponse } from "./../models/user-management/user-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private apiUrl = 'http://localhost:8080/api/users';
  private http: HttpClient; 

  constructor(http: HttpClient) { 
    this.http = http;
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<UserResponse> { 
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserResponse>(url);
  }

  getUserByUsername(username: string): Observable<UserResponse> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get<UserResponse>(url);
  }

  getUserByName(name: string): Observable<UserResponse> { 
    const url = `${this.apiUrl}/${name}`;
    return this.http.get<UserResponse>(url);
  }

  getUserByMobileno(mobileno: number): Observable<UserResponse> { 
    const url = `${this.apiUrl}/${mobileno}`;
    return this.http.get<UserResponse>(url);
  }

  getUserByEmail(email: string): Observable<UserResponse> { 
    const url = `${this.apiUrl}/${email}`;
    return this.http.get<UserResponse>(url);
  }

  addUser(user: UserRequest): Observable<UserResponse> {
    const url = `${this.apiUrl}`;
    return this.http.post<UserResponse>(url, user);
  }

  updateUser(id: number, user: UserRequest): Observable<UserResponse>{
    const url = `${this.apiUrl}/${id}`
    return this.http.put<UserResponse>(url, user);
  }

  deleteUser(id: number): Observable<UserResponse>{
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<UserResponse>(url);
  }
}