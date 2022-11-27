import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgResizeObserver, ngResizeObserverProviders} from "ng-resize-observer";
import {State, StateProperty} from "../../common/state";
import {BaseChartDirective} from "ng2-charts";
import { ChartData } from "chart.js";
import * as polarUtils from './polar-chart.options';
import {Skill, SkillRating} from "../../model/skill";
import * as chartUtils from "../chart.utils";

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss'],
  providers: [...ngResizeObserverProviders]
})
export class PolarChartComponent implements AfterViewInit {
  @ViewChild('chart')
  chart!: BaseChartDirective;
  options = polarUtils.options;

  @Input() title: string = '';
  @Input() rating!: StateProperty<SkillRating>;


  constructor(state: State) { }


  ngAfterViewInit(): void {
    polarUtils.updateGradient(this.chart?.chart);

    chartUtils.updateRating(this.rating, this.chartData, this.chart?.chart);
  }


  public chartData: ChartData<'polarArea'> = {
    datasets: [
      {
        data: [ 0, 1, 3, 2, 4 ],
      },
      {
        data: [ 0, 1, 3, 2, 4 ],
        backgroundColor: '#0000002f'
      }
    ]
  };


}
