import { Injectable } from '@angular/core';
import {State} from "../common/state";
import {NameService} from "./name.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { v4 as uuidv4 } from 'uuid';
import {Session, SessionError, sessionErrors, SessionInit, User} from "../model/session";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map, Observable, of, Subscription} from "rxjs";
import {StorageService} from "./storage.service";
import {LocalStorageService} from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private storage: StorageService,
    private browserStorage: LocalStorageService,

    private state:State,
    private nameServiice: NameService,
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar) {
  }

  public createNewSession(session: SessionInit) {
    console.log('create new session...', session.me)
    const sessionId = uuidv4();

    return new Promise(resolve => {
      this.firestore.collection('sessions').doc(sessionId)
        .set({
          id: sessionId,
          name: 'new session',
          created: Date.now()
        }).then((r) => {
            console.log('session created.', sessionId);
            this.storage.addUser(sessionId, session.me)
                        .then(() => {
                          this.state.hasSession.val = true;

                          this.browserStorage.persistMe(sessionId, session.me);

                          resolve(sessionId);
                        });
      })
    });

  }

  public joinSession(session: SessionInit) {
    console.log(`join active session[${session.sessionID}] as ${session.me.name} - ${session.me.id}`);
    this.subscribeDocumentUpdates(session.sessionID ?? '');

    // avoid append me as user twice
    if (this.state.sessionUsers.val.find(u => u.id === session.me.id)) {
      console.log(`me as user[${session.me.name} - ${session.me.id}] is already appended!`)
    } else {
      this.storage.addUser(session.sessionID ?? '', session.me)
        .then(u => {
          this.browserStorage.persistMe(session.sessionID ?? '', session.me);
        })
    }
  }

  private subscribeDocumentUpdates(sessionId: string) {
    this.firestore.collection('sessions').doc<Session>(sessionId).collection('users')
      .valueChanges()
      .subscribe(users => {
        if (users)
          this.state.sessionUsers.val = users.map<User>(u => u as User);

        console.log('new USERS update from firebase: ', users);
      })
  }

  validateSession(sessionID: string | null) : Observable<SessionInit> {
    if (!sessionID) {
      this.state.sessionInit.val.error = sessionErrors.EMPTY_SESSION;
      this.state.sessionInit.update();
      this._snackBar.open(sessionErrors.EMPTY_SESSION.error, 'x', { panelClass: ['error']});
      return of(this.state.sessionInit.val);
    }

    return this.firestore.collection('sessions').doc(sessionID).get()
      .pipe(map(doc => {
        let inUse:string[] = [] //this.state.session.val?.users?.map(u => u.name) ?? [];

        if (doc.exists) {
          // this.joinSession(sessionID);
          const data:any = doc.data()
          this.state.sessionInit.val.sessionID = sessionID;
          this.state.sessionInit.val.hasValidSession = true;

          inUse = data?.users?.map((u:any) => u.name) ?? [];
        } else {
          this.state.sessionInit.val.error = sessionErrors.INVALID_SESSION;
          this._snackBar.open(sessionErrors.INVALID_SESSION.error, 'x', { panelClass: ['error']});
        }

        const persistedUser = this.browserStorage.loadMe(sessionID);

        if (!persistedUser) {
          this.state.sessionInit.val.me = {
            id : uuidv4(),
            name : this.nameServiice.generate(inUse)
          }
          console.log('new username generated: ' + this.state.sessionInit.val.me.name)
        } else {
          console.log('persisted user exists: ' + persistedUser);
          this.state.sessionInit.val.me = persistedUser;
        }

        this.state.sessionInit.update();
        console.log('validate active session', doc.data())

        return this.state.sessionInit.val
    }));
  }



}
