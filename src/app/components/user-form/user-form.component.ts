import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  user: User;

  constructor(private sharinData: SharingDataService,
    private router: Router) {
     if (this.router.currentNavigation()?.extras.state) {
       this.user = this.router.currentNavigation()?.extras.state!['user'];
     } else {
       this.user = new User();
     }
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharinData.newUserEventEmitter.emit(this.user);
      console.log(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
