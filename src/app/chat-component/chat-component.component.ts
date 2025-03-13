import {ChangeDetectorRef, Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf} from '@angular/common';
import {ChatServiceService, Message} from '../shared/services/chat-service.service';
import {UserService} from "../shared/services/user.service";

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

  private _chatService = inject(ChatServiceService);
  private _userData = inject(UserService);
  private _pageDetector = inject(ChangeDetectorRef);

  public message: string = '';
  public messages: Message[] = [];

  public userName: string = ''

  ngOnInit() {
    this.userName = this._userData.getUserName();

    this._chatService.messages$.subscribe((messages: Message[]) => {
      this.messages = messages;
      this._pageDetector.detectChanges(); // Форсируем обновление UI
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

    console.log(this.message.trim())
    this._chatService.sendMessage(this.userName, this.message.trim());
    this.message = '';

  }

  public changeUser(): void {
    this._userData.clearUser();
    window.location.reload()
  }

}
