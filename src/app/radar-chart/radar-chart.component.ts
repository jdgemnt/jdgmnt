import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    events: ['click'],
    elements: {
      line: {
        borderWidth: .5
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
            size: 15,
            weight: 'lighter',
            family: 'Jura'
          },
          color: '#ffffff3F'
        },
        ticks: {
          display: false, // Hides the labels in the middel (numbers)
          count: 5
        },
        grid: {
          circular: true,
          tickWidth:.2,
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
      { data: this.getRandom(), label: 'Series B', fill: true }
    ]
  };
  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked(e: any): void {  //{ event, active }: { event: ChartEvent, active: {}[] }
    // console.log(event, active);

    console.log('hello...', e.event.chart)

    this.radarChartData.datasets[0].data = this.getRandom();
    this.radarChartData.datasets[1].data = this.getRandom();

    e.event.chart.update()
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
