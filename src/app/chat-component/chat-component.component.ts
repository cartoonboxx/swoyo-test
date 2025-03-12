import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf} from '@angular/common';
import {LocalStorageService} from '../shared/services/local-storage.service';
import {ChatServiceService} from '../shared/services/chat-service.service';

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
  private chatService = inject(ChatServiceService);

  public message: string = '';
  public messages: {username: string, message: string, date: Date}[] = [];

  public userName: string = ''

  ngOnInit() {
    this.userName = JSON.parse(
      this._localStorage.get('userData')
    ).username;

    this.chatService.messages$.subscribe((messages: {username: string, message: string, date: Date}[]) => {
      this.messages = messages;
    })
  }

  public sendAndSaveMessage(event: Event | KeyboardEvent): void {
    // event [KeyboardEvent | Submit]
    event.preventDefault();

    if (event instanceof KeyboardEvent && event.key !== "Enter") {
      return;
    }

    if (!this.message.trim()) {
      return;
    }

    this.chatService.sendMessage(this.userName, this.message.trim());
    this.message = '';

  }

}
