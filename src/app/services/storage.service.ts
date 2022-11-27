import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../model/session";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private state:State,
    private firestore: AngularFirestore) {
  }

  addUser(sessionId: string, user: User) {
    return this.firestore.collection('sessions').doc(sessionId)
      .collection('users').doc(user.id)
      .set(user)
      .then(u => {
        console.log('new user appended', user.id);
      })
      .catch(e => {
        console.error(`while appending user[${user?.id} ${user?.name}] to session[${sessionId}]`)
      });
  }

}
