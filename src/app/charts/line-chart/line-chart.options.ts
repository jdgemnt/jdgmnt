import {ChartOptions} from "chart.js";

export const createGradient = (chart:any) => {
  const chartHeight = chart.height ?? 0;
  // console.log('chart hight', chartHeight)

  const gradient = chart?.ctx.createLinearGradient(0, 0, 0, chartHeight-40);
  gradient.addColorStop(0, '#A8E8FD');
  gradient.addColorStop(1, '#293C4B00');

  return gradient;
}

export const options: ChartOptions<'line'> = {
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

export const updateGradient = (chart: any) => {
  if (chart) {
    const chartArea = chart.ctx;
    if (!chartArea) {
      return;
    }

    chart.options.backgroundColor = createGradient(chart);
  }

  chart.update();
}
