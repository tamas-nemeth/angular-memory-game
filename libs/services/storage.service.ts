import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  get(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  set(key: string, value: any) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
}
