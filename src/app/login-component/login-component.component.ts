import {Component, inject} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-login-component',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {

  public userData = inject(UserService)

  public username: string = '';

  public createNewUser(event: any): void {
    event.preventDefault();

    const validName = this.username.trim();

    if (validName === '') {
      return
    }

    this.userData.setUserName(validName);

    window.location.reload()

  }


}
