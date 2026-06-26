import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'user',
  imports: [FormsModule],
  templateUrl: './user.component.html'
})
export class UserComponent  {

  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter();

  @Output() selectUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
    const confirmRemuve = confirm(`¿Está seguro de eliminar el usuario ?`);
    if(confirmRemuve) {
      this.idUserEventEmitter.emit(id);
    }
  }

  onSelectUser(user: User): void {
    this.selectUserEventEmitter.emit(user);
  }

  

  selectedActions: { [key: number]: string } = {};
 

   executeAction(userId: number): void {

    const action = this.selectedActions[userId];

    console.log('Usuario seleccionado:', userId);
    console.log('Acción:', action);


    switch(action) {

      case 'crear':
        console.log('Crear usuario');
        break;

      case 'buscar':
        console.log('Buscar usuarios');
        break;

      case 'buscarPorUsername':
        console.log('Buscar por username');
        break;

      case 'editar':
        console.log('Editar usuario con id:', userId);
        break;

      case 'eliminar':
        console.log('Eliminar usuario con id:', userId);
        break;

      default:
        console.log('No seleccionó acción');
    }
  }

  

 

}
