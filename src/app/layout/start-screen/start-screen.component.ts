import { Component, OnInit } from '@angular/core';
import { State } from "../../common/state";
import { timer } from "rxjs";
import { SessionService } from "../../services/session.service";
import {Router} from "@angular/router";
import {NameService} from "../../services/name.service";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  infoText!: string;

  constructor(public state: State,
              private nameService: NameService,
              private session: SessionService,
              private router: Router) { }

  ngOnInit(): void {
    this.state.sessionInit.val$.subscribe(si => {

      if (!si.me.name) si.me.name = this.nameService.generate();
      if (!si.me.id) si.me.id = uuidv4();

      console.log('start screen user', si.me);

      this.infoText = si.sessionID?
        `<span>join active session as <span class="text-accent bold">${si.me.name}</span></span>` :
        `<span>create new session & join as <span class="text-accent bold">${si.me.name}</span></span>`
    });
  }

  enterTheSpace() {
    if(this.state.sessionInit.val.hasValidSession) {
      // JOIN ACTIVE SESSION
      this.session.joinSession(this.state.sessionInit.val);

      timer(1000).subscribe(() => {
        this.state.hasEntered.val = true;
      });
    }
    else
    {
      // CREATE NEW SESSION
      this.session.createNewSession(this.state.sessionInit.val)
        .then(sessionID => {
          this.router.navigate([sessionID]);
        });
    }

  }
}
