import { Injectable } from '@angular/core';
import names from '../model/names';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor() { }

  public generate(inUse?:string[]) {
    const filtered =  names.filter(n => (inUse ?? []).indexOf(n) < 0);
    const index = Math.floor(Math.random() * (filtered.length - 1 + 1)) + 1;

    return filtered[index];
  }
}
