import { Injectable } from '@angular/core';
import {User} from "../model/session";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  persistMe(sessionID: string, me: User) {
    localStorage.setItem(`${sessionID}`, JSON.stringify(me));
  }

  loadMe(sessionID: string) {
    if (!sessionID) return null;

    const json = localStorage.getItem(`${sessionID}`);

    try {
      return json ? JSON.parse(json) : null;
    }
    catch (e) {
      console.error('while loading user from local storage', e)
    }
  }
}
