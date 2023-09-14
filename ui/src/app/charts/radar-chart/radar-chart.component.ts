import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";
import { State, StateProperty } from "../../common/state";
import * as radarUtils from "./radar-chart.options";
import * as chartUtils from "../chart.utils";
import { SkillRating } from "../../model/skill";
import {updateWidth} from "./radar-chart.options";


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements AfterViewInit {
  @ViewChild('chart')
  chart!: BaseChartDirective;
  options = radarUtils.options;

  @Input() title: string = '';
  @Input() rating!: StateProperty<SkillRating>;

  constructor(state: State) { }

  ngAfterViewInit(): void {
    radarUtils.updateWidth(this.chart?.chart);

    chartUtils.updateRating(this.rating, this.chartData, this.chart?.chart);
  }

  getRandom = () => {
    return this.rating?.val?.labels.map(l => Math.floor(Math.random() * 5)) ?? [];
  }
  public chartData: ChartData<'radar'> = {
    datasets: [
      { data: [], label: 'Series A', backgroundColor: 'rgba(255, 108, 135, .4)' },
      { data: this.getRandom(), label: 'Series B', showLine: false },
      { data: this.getRandom(), label: 'Series C', showLine: false }
    ]
  };

  // events
  public chartClicked(e: any): void {
    console.log('hello...', e.event.chart)

    this.chartData.datasets[0].data = this.getRandom();
    this.chartData.datasets[1].data = this.getRandom();
    this.chartData.datasets[2].data = this.getRandom();

    e.event.chart.update()
  }
}
