import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-app',
  imports: [],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent {
  title: string = 'Listado de usuarios';

  users: User[] = [];
  constructor(private service: UserService) {//se inyecta el service 

  }
}
