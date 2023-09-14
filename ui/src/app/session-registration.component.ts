import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "./services/session.service";
import {sessionErrors} from "./model/session";
import {State} from "./common/state";
import {timer} from "rxjs";

@Component({
  template: '',
  styles: ['']
})
export class SessionRegistrationComponent implements OnInit {

  constructor(private state: State,
              private activatedRoute:ActivatedRoute,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    const segments = this.activatedRoute.snapshot.url;

    this.activatedRoute.paramMap.subscribe(params => {
      const sessionID = params.get('sessionID')
      const confirmationMode = (segments.length > 1 && segments[1].path === 'confirm')

      this.sessionService.validateSession(sessionID).subscribe(s => {

        if (!confirmationMode) {
          console.log('join session without confirmation!!!!')

          if(this.state.sessionInit.val.hasValidSession) {
            // JOIN ACTIVE SESSION
            this.sessionService.joinSession(this.state.sessionInit.val);

            timer(1000).subscribe(() => {
              this.state.hasEntered.val = true;
            });
          }
        } else {
          console.log('join session with confirmation and  name', s.me.name)
        }

      });


    });
  }
}
