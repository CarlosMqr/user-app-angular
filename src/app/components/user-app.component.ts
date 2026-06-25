import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'user-app',
  imports: [UserComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de usuarios';

  users: User[] = [];
  
  constructor(private service: UserService) {//se inyecta el service 

  }
  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

 

}
