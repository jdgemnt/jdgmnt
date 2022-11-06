import { Component, OnInit } from '@angular/core';
import {State} from "../../common/state";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor(public state: State) { }

  ngOnInit(): void { }

  onUpdateSkills() {
    this.state.skills.val = this.state.skills.val;
  }

  onUpdateFrameworks() {
    this.state.frameworks.val = this.state.frameworks.val;
  }
}
