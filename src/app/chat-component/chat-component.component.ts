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

  // public isYour = JSON.parse(this._localStorage.get('userData')).username 'your'
  public isYour: string = '';

  constructor() {
    console.log(this.messages)
  }

  public sendAndSaveMessage(event: Event | KeyboardEvent): void {
    // event [KeyboardEvent | Submit]
    event.preventDefault(); // Останавливаем стандартное поведение формы

    if (event instanceof KeyboardEvent && event.key !== "Enter") {
      return; // Если это не Enter, выходим
    }

    if (!this.message.trim()) {
      return; // Если сообщение пустое — не отправляем
    }

    const userData = JSON.parse(this._localStorage.get('userData'))
    console.log(userData);
    this.messages.push({
      username: userData.username,
      message: this.message.trim(),
      date: new Date()
    })

    this.message = '';
    console.log(this.messages)

    this._localStorage.set('messages', JSON.stringify(this.messages))

  }

}
