import { Component, OnInit } from '@angular/core';
import {State} from "../../common/state";
import { timer } from "rxjs";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(public state: State) { }

  ngOnInit(): void {
  }

  enterTheSpace() {
    timer(1000).subscribe(() => {
      this.state.hasEntered.val = true;
    });
  }
}
