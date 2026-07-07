import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    //return of(this.users);
    return this.http.get<User[]>('http://localhost:8080/api');
  }

  save(user: User): Observable<User> { 
    return this.http.post<User>('http://localhost:8080/api/users', user);
  }

  findById(id: number): Observable<User | undefined> {
    return of(this.users.find((user) => user.id === id));
  }
}
