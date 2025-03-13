import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

interface UserData {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userData: UserData = {
    username: ''
  };
  private _localStorage = inject(LocalStorageService)

  constructor() {
    this._userData = JSON.parse(this._localStorage.get('userData')) as UserData;
  }

  public getUserName(): string {
    return this._userData.username;
  }

  public setUserName(name: string) {
    this._userData = {
      username: name
    }

    this._localStorage.set('userData', JSON.stringify(this._userData));

  }

  public clearUser() {
    this._localStorage.remove('userData');
  }
}
