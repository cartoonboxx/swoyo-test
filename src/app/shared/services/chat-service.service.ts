import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {LocalStorageService} from './local-storage.service';

export interface Message {
  username: string,
  message: string,
  date: Date
}

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private _broadCast = new BroadcastChannel('messages_channel')

  private _localStorage: LocalStorageService = inject(LocalStorageService)
  public messageSubj: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this.loadMessage());
  messages$: Observable<Message[]> = this.messageSubj.asObservable();


  constructor() {
    this._broadCast.onmessage = (event) => {
      this.addMessage(event.data, false)
    }
  }

  public sendMessage(username: string, message: string): void {
    const newMessage: Message = {
      username: username,
      message: message,
      date: new Date()
    }

    this.addMessage(newMessage);
    this._broadCast.postMessage(newMessage);
  }

  private addMessage(message: Message, broadcast: boolean = true): void {
    const allMessages: Message[] = [...this.messageSubj.getValue(), message];

    // удаляем дубликаты
    if (allMessages.length > 1) {
      if (allMessages[allMessages.length - 1].date.toString()
        === allMessages[allMessages.length - 2].date.toString()) {
        allMessages.splice(allMessages.length - 1)
      }
    }

    this.messageSubj.next(allMessages);
    this._localStorage.set('messages', allMessages)

    if (broadcast) {
      this._broadCast.postMessage(message);
      console.log(message)
    }

  }

  private loadMessage(): Message[] {
    return this._localStorage.get('messages') !== null ? this._localStorage.get('messages').map(
      (message: object) => message as Message
    ) : []
  }
}
