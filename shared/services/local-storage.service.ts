import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public set(key: string, value: any): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    if (!this.isBrowser) return null;
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public remove(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }

  public has(key: string): boolean {
    if (!this.isBrowser) return false;
    return localStorage.getItem(key) !== null;
  }

  public clear(): void {
    if (!this.isBrowser) return;
    localStorage.clear();
  }
}
