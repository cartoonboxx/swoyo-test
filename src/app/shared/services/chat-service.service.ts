import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private _localStorage: LocalStorageService = inject(LocalStorageService)
  public messageSubj = new BehaviorSubject<{username: string, message: string, date: Date}[]>(this.loadMessage());
  messages$ = this.messageSubj.asObservable();

  public sendMessage(username: string, message: string): void {
    const newMessage = {
      username: username,
      message: message,
      date: new Date()
    }

    this.addMessage(newMessage);
  }

  private addMessage(message: {username: string, message: string, date: Date}) {
    const allMessages: {username: string, message: string, date: Date}[] = [...this.messageSubj.getValue(), message];
    this.messageSubj.next(allMessages);
    this._localStorage.set('messages', allMessages)
  }

  public loadMessage(): {username: string, message: string, date: Date}[] {
    return this._localStorage.get('messages') || []
  }
}
