import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf} from '@angular/common';
import {LocalStorageService} from '../shared/services/local-storage.service';

@Component({
  selector: 'app-chat-component',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
  ],
  templateUrl: './chat-component.component.html',
  styleUrl: './chat-component.component.scss'
})
export class ChatComponentComponent {

  private _localStorage = inject(LocalStorageService);

  public message: string = '';
  public messages: { username: string; message: string, date: Date }[] = this._localStorage.has('messages') ? JSON.parse(this._localStorage.get('messages')) : [];

  public currentDate: Date = new Date();

  constructor() {
    console.log(this.messages)
  }

  public alertMessage(event: any): void {
    event.preventDefault();

    this.currentDate = new Date();
    const userData = JSON.parse(this._localStorage.get('userData'))
    console.log(userData);
    this.messages.push({
      username: userData.username,
      message: this.message,
      date: this.currentDate
    })

    this.message = '';
    console.log(this.messages)

    this._localStorage.set('messages', JSON.stringify(this.messages))

  }

}
