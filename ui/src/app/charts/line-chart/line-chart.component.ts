import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {State, StateProperty} from "../../common/state";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {NgResizeObserver, ngResizeObserverProviders} from "ng-resize-observer";
import * as lineUtils from "./line-chart.options";
import {Skill, SkillRating} from "../../model/skill";
import * as chartUtils from "../chart.utils";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [...ngResizeObserverProviders]
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('chart')
  chart!: BaseChartDirective;
  options = lineUtils.options;

  @Input() title: string = '';
  @Input() rating!: StateProperty<SkillRating>;


  constructor(public state: State) { }

  ngAfterViewInit(): void {
    lineUtils.updateGradient(this.chart?.chart);

    chartUtils.updateRating(this.rating, this.chartData, this.chart?.chart);
  }


  public chartData: ChartData<'line'> = {
    datasets: [
      { data: [ ], label: 'Series A', fill: 'origin' },
      { data: [ 1, 0, 4, 3, 4, 2, 1, 1, 0, 0, 1 ], label: 'Series B', fill: 'origin', backgroundColor:  'rgba(0, 0, 0, .07)' }
    ]
  };

}
