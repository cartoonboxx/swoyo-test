import {Component, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LocalStorageService} from '../shared/services/local-storage.service';

@Component({
  selector: 'app-login-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {
  public loginForm: FormGroup = new FormGroup({});

  private _localStorage = inject(LocalStorageService)

  public createNewUser(event: any): void {
    event.preventDefault();

    this._localStorage.set('userData', JSON.stringify({
      username: "Максим"
    }))

    window.location.reload()

  }


}
