import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import {ThemePalette} from "@angular/material/core";
import {State} from "./common/state";
import {SessionConnectorService} from "./services/session-connector/session-connector.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sessions: Observable<any[]>;


  constructor(firestore: AngularFirestore, public state: State, private session: SessionConnectorService) {
      this.sessions = firestore.collection('sessions').valueChanges();
  }


}
