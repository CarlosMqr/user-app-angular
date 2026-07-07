import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  user: User;

  constructor(private sharinData: SharingDataService, private route: ActivatedRoute) {
     this.user = new User();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      const id: number = +(params.get('id') || '0');
      if (id > 0) { 
        this.sharinData.idUserEventEmitter.emit(id);
      }
    })
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
