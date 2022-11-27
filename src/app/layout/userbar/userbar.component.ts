import { Component, OnInit } from '@angular/core';
import {State} from "../../common/state";
import {User} from "../../model/session";

@Component({
  selector: 'app-userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.scss']
})
export class UserbarComponent implements OnInit {
  constructor(public state: State) { }
  users!: User[];

  ngOnInit(): void {
    this.state.sessionUsers.val$.subscribe(u => {
        if (u) {
          this.users = u.sort((a, b) => b.me? 1 : -1)
        }
    })
  }

}
