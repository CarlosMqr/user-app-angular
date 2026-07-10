import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';


@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserAppComponent implements OnInit {
  users: User[] = [];


  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {
    //se inyecta el service
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() { 
    this.sharingData.findUserByIdEventEmitter.subscribe(id => { 
      const user = this.users.find(user => user.id == id);
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      const isEdit = user.id != null && user.id > 0;
      if (isEdit) {
        this.service.update(user).subscribe(
          {
            next: (userUpdated) => {    
              this.users = this.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u);
               
           Swal.fire({
             title: 'Actualizado!',
             text: 'Usuario actualizado con exito!',
             icon: 'success',
           });
              this.router.navigate(['/users']);
        },
          error: (err) => {
            // console.log('Error al actualizar el usuario', err.error);
            this.sharingData.errorsUserFormEventEmitter.emit(err.error);
          }})
        
      } else {
        this.service.create(user).subscribe({
          next: userNew => {
            console.log('userNew', userNew);
            this.users = [...this.users, { ...userNew }];            
             Swal.fire({
               title: 'Guardado!',
               text: 'Usuario guardado con exito!',
               icon: 'success',
             });
             this.router.navigate(['/users']);
          },
          error: (err) => {
            //console.log('Error al crear el usuario', err.error);
            this.sharingData.errorsUserFormEventEmitter.emit(err.error);
          },
        });
      }
    })
  
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe( id => {
      Swal.fire({
        title: 'Seguro que quiere eliminar?',
        text: 'Cuidado el usuario sera eliminado del sistema!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.delete(id).subscribe(() => { 
            this.users = this.users.filter((user) => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users']);
            });
           })
          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario eliminado con exito.',
            icon: 'success',
          });
        }
      });
    });
  }
}
