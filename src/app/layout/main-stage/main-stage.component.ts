import { Component, OnInit } from '@angular/core';
import {State} from "../../common/state";

@Component({
  selector: 'app-main-stage',
  templateUrl: './main-stage.component.html',
  styleUrls: ['./main-stage.component.scss']
})
export class MainStageComponent implements OnInit {

  constructor(public sate:State) { }

  ngOnInit(): void {
  }

}
