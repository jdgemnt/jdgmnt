import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {State} from "../../common/state";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  nav = [
    // {title: 'home', icon: 'dashboard', active: false},
    { title: 'specialization', icon: 'filter_tilt_shift', active: false, tooltip: 'rate specialization, determine the technical profile.' },
    { title: 'soft skills', icon: 'blur_on', active: false, tooltip: 'rate soft skills, discover more useful skills.' },
    { title: 'tech-stack', icon: 'code', active: false, tooltip: 'rate languages & frameworks.' },
    { title: 'share', icon: 'share', active: false, tooltip: 'configure the tool.' },
    { title: 'settings', icon: 'settings', active: false, tooltip: 'configure the tool.' }
  ];

  primaryColor:ThemePalette = 'primary';

  constructor(public state: State) { }

  ngOnInit(): void {
    this.navigate(this.state.activeItem.val);
  }

  navigate(title: string) {
    // this.state.isEditMode.val = title === 'home';

    this.nav.forEach(n => {
      n.active = n.title == title;
    })

    this.state.activeItem.val = title;
  }

}
