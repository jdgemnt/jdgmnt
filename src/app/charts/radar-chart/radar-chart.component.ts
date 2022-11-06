import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import {BaseChartDirective} from "ng2-charts";
import {
  ngResizeObserverProviders,
  NgResizeObserver
} from "ng-resize-observer";
import {map, tap} from "rxjs";
import {State} from "../../common/state";


@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
  providers: [...ngResizeObserverProviders]
})
export class RadarChartComponent implements AfterViewInit {
  @ViewChild('chart')
  chart!: BaseChartDirective;

  @Input() title: string = '';

  width$ = this.resize$.pipe(
    map(entry => entry.contentRect.width)
  ).pipe(tap(e => {
    console.log('update chart!');
    this.chart?.chart?.update();
  }));

  constructor(private resize$: NgResizeObserver, state: State) {
    state.skills.val$.subscribe(skills => {
      if (skills != null) {
        const d = this.radarChartData.datasets[0].data?.map(n => n);
        d[0] = skills[0].value;
        d[1] = skills[1].value;
        d[2] = skills[2].value;
        d[3] = skills[3].value;
        this.updateSkills(d)
      }
    });
  }

  ngAfterViewInit(): void {
    this.chart?.chart?.update();
  }

  // Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    events: ['click'],
    elements: {
      line: {
        borderWidth: .5,
        hoverBorderWidth: 1,
        tension: .3
      },
      point: {
        borderWidth: 0,
        radius: 0
      }
    },
    scales: {
      r: {
        min: 0,
        max: 5,
        beginAtZero: true,
        pointLabels: {
          display: true,
          padding: 20,
          font: {
            size: 16,
            weight: 'lighter',
            family: 'Jura'
          },
          color: '#A8E8FD5F',

        },
        ticks: {
          display: false, // Hides the labels in the middel (numbers)
          count: 5
        },
        grid: {
          circular: true,
          tickWidth:.5,
          borderColor: '#A8E8FD'
        }
      },
    }


  };
  public radarChartLabels: string[] = [ 'architecture', 'ui/ux', 'frontend', 'backend', 'devops', 'infrastructure', 'cyber security', 'mobile development', 'test automation', 'ml/ai', 'data analytics', 'embedded systems', 'agile', 'documentation' ];

  getRandom = () => {
    return this.radarChartLabels.map(l => Math.floor(Math.random() * 5));
  }

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: this.getRandom(), label: 'Series A', backgroundColor: 'rgba(255, 108, 135, .4)' },
      { data: this.getRandom(), label: 'Series B', backgroundColor: 'rgba(0, 0, 0, .2)', showLine: false },
      { data: this.getRandom(), label: 'Series C', backgroundColor: 'rgba(0, 0, 0, .2)', showLine: false }
    ]
  };
  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked(e: any): void {  //{ event, active }: { event: ChartEvent, active: {}[] }
    // console.log(event, active);

    console.log('hello...', e.event.chart)

    this.radarChartData.datasets[0].data = this.getRandom();
    this.radarChartData.datasets[1].data = this.getRandom();
    this.radarChartData.datasets[2].data = this.getRandom();

    e.event.chart.update()
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public updateSkills(data:(number|null)[]) {
    this.radarChartData.datasets[0].data = data;
    this.chart?.chart?.update();
  }
}
