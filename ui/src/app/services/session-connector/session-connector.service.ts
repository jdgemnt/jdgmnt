import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SessionConnectorService {

  constructor(private http: HttpClient) {
    const socket = io('http://localhost:3000', {
      path: '/socket/',
    });
    console.log('Heyo')
    socket.connect();

  }
}
