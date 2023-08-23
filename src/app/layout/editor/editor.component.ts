import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { State } from "../../common/state";
import { timer } from "rxjs";
import { Router } from "@angular/router";
import { Skill } from "../../model/skill";
import {BaseChartDirective} from "ng2-charts";
import {QrCodeComponent} from "ng-qrcode";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editorElm!: ElementRef;
  @ViewChild('qr') qrElm!: ElementRef;

  headline = {
    current: {title : 'Specialization rating', state: ''},
    next: { title: 'Soft Skills', state: 'left'}
  }
  url : string = '';
  areas = {
    'specialization' : { active: false, state: 'right'},
    'soft skills' :  { active: false, state: 'right'},
    'tech-stack' :  { active: false, state: 'right'},
    'share' :  { active: false, state: 'right'},
    'settings' :  { active: false, state: 'right'}
  }

  specializedSkills!: Skill[];
  softSkills!: Skill[];
  frameworks!: Skill[];

  constructor(public state: State, public location: Location, public router: Router,
              public clipboardApi: ClipboardService) {}

  ngOnInit(): void {
    this.specializedSkills = this.state.skillsRating.val.own ?? [];
    this.softSkills = this.state.softSkillsRating.val.own ?? [];
    this.frameworks = this.state.frameworksRating.val.own ?? [];

    this.url = window.location.href;
    this.state.activeItem.val$.subscribe((active:string) => {
        const currentActive = Object.values(this.areas).find(a => a.active);

        if ((this.areas as any)[active].active) return;

        if (currentActive) {
          currentActive.active = false;
          currentActive.state = 'left';

          timer(600).subscribe(() => {
            currentActive.state = 'right';
          });
        }

        const nextActive =  (this.areas as any)[active];
        if (nextActive){
          nextActive.active = true;
          nextActive.state = '';
        }

        this.rotateHeadline(active);
    });
  }

  private rotateHeadline(active: string) {

    if (this.headline.current.state !== '') {
        this.headline.current.state = '';
        this.headline.current.title = active;

        this.headline.next.state = 'out';

        timer(500).subscribe(() => { this.headline.next.state = 'left'; });

    } else {
      this.headline.current.state = 'out';

      this.headline.next.title = active;
      this.headline.next.state = '';

      timer(500).subscribe(() => { this.headline.current.state = 'left'; });
    }

  }

  ngAfterViewInit(): void {
    timer(500).subscribe(() => {
      console.log('aaa', );
      (this.qrElm as QrCodeComponent).size = this.editorElm.nativeElement.offsetWidth - 40;
    });
  }

}
