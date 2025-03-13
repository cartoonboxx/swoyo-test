import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatComponentComponent} from './chat-component/chat-component.component';
import {LoginComponentComponent} from './login-component/login-component.component';
import {LocalStorageService} from './shared/services/local-storage.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatComponentComponent, LoginComponentComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Messanger';

  private _localStorage = inject(LocalStorageService)

  public authenticated = this._localStorage.has('userData');

  constructor() {

    console.log(this.authenticated)
  }


}
