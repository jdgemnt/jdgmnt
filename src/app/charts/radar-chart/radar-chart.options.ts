import {ChartOptions} from "chart.js";
import {createGradient} from "../line-chart/line-chart.options";

export const options: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: true,
  events: ['click'],
  backgroundColor: 'rgba(0, 0, 0, .2)',
  elements: {
    line: {
      borderWidth: .5,
      hoverBorderWidth: 1,
      tension: .3
    },
    point: {
      borderWidth: 0,
      radius: 0
    },
    arc: {

    }
  },
  plugins: {
    legend: {
      display: false
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

export const updateWidth = (chart: any) => {
  if (chart) {
    const chartArea = chart.ctx;
    if (!chartArea) {
      return;
    }

    chart.options.scales.r.pointLabels.font.size =  (chart.width < 600) ? 14 : 16;
  }

  chart.update();
}
