import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    //return of(this.users);
    return this.http.get<User[]>(this.apiUrl);
  }

  findById(id: number): Observable<User> { 
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  } 

  create(user: User): Observable<User> { 
    return this.http.post<User>(`${this.apiUrl}/users`, user)
  }

  update(user: User): Observable<User> { 
    return this.http.put<User>(`${this.apiUrl}/user/${user.id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/userd/${id}`);
  }

/*  findById(id: number): Observable<User | undefined> {
    return of(this.users.find((user) => user.id === id));
  }
  */
}
