import { Component, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
})
export class UserComponent {
  title: string = 'Listado de usuarios';

  users: User[] = [];

  constructor(
    private service: UserService,
    private router: Router,
    private sharinData: SharingDataService) {
    if (this.router.currentNavigation()?.extras.state) {
      this.users = this.router.currentNavigation()?.extras.state!['users'];
    } else {
      this.service.findAll().subscribe(users => this.users = users);
    }
  }

  onRemoveUser(id: number): void {
    this.sharinData.idUserEventEmitter.emit(id);
  }

  onSelectUser(user: User): void {
    this.router.navigate(['/users/edit', user.id], {state: {user}});
  }
}
