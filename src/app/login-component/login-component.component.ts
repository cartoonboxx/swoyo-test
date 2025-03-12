import {Component, inject} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocalStorageService} from '../shared/services/local-storage.service';

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

  private _localStorage = inject(LocalStorageService)

  public username: string = '';

  public createNewUser(event: any): void {
    event.preventDefault();

    const validName = this.username.trim();

    if (validName === '') {
      return
    }

    this._localStorage.set('userData', JSON.stringify({
      username: validName
    }))

    window.location.reload()

  }


}
