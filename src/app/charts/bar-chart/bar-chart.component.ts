import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {State} from "../../common/state";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {NgResizeObserver, ngResizeObserverProviders} from "ng-resize-observer";
import {map, tap} from "rxjs";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  providers: [...ngResizeObserverProviders]
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('chart')
  chart!: BaseChartDirective;
  gradient!: CanvasGradient;

  @Input() title: string = '';

  constructor(private resize$: NgResizeObserver, state: State) {
    state.frameworks.val$.subscribe(frmwrks => {
      if (frmwrks != null) {

        const d = frmwrks.map(f => f.value);
        d.unshift(0);
        d.push(0);

        this.updateChart(d);
      }
    });
  }

  ngAfterViewInit(): void {

    if (this.chart?.chart) {
      this.gradient = this.chart?.chart?.ctx.createLinearGradient(0, 0, 0, 200);
      this.gradient.addColorStop(0, '#A8E8FD');
      this.gradient.addColorStop(1, '#293C4B00');
      this.chart.chart.options.backgroundColor = this.gradient;
    }

    this.chart?.chart?.update();
  }


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: .5,
        borderColor: '#A8E8FD',
        borderWidth: .0,
        hoverBorderWidth: 2
      },
      bar: {

      },
      point: {
        pointStyle: 'circle',
        hitRadius: 10,
        radius: 0,
        borderWidth: .1,
        borderColor: '#000',
        backgroundColor: '#000',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#A8E8FD5F',
          font: {
            size: 12,
            weight: 'lighter',
            family: 'Jura',
          },
        },
        weight: 1,
        grid: {
          tickWidth: .0,
          display: false,
          borderWidth: 0,
        },
      },
      y: {
        min: 0,
        max: 6,
        beginAtZero: true,
        display: false,
        ticks: {
          display: false,
          count: 6
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    }
  };
  public barChartType: ChartType = 'line';

  public barChartData: ChartData<'line'> = {
    labels: [ '', 'angular', 'typescript', 'nest', 'node', 'java', 'spring', 'postgresql', 'k8s', 'docker', 'mssql', 'helm', 'terraform', 'gh actions', 'jenkins', 'firebase', 'rest api' , ''],
    datasets: [
      { data: [ 0, 1, 1, 4, 3, 2, 3, 0, 1, 3, 4, 3, 3, 1, 4, 3, 1, 0], label: 'Series A', backgroundColor: this.gradient, fill: 'origin' }
    ]
  };

  public updateChart(data:any[]) {
    this.barChartData.datasets[0].data = data;
    this.chart?.chart?.update();
  }
}
