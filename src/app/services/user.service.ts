import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private users: User[] = [
    {
      id: 1,
      name: 'Carlos',
      lastname: 'Mendoza',
      email: 'carlos.mendoza@example.com',
      username: 'carlosmendoza',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Alice',
      lastname: 'Smith',
      email: 'alice.smith@example.com',
      username: 'alicesmith',
      password: 'password123',
    },
  ];

  constructor() {}

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
