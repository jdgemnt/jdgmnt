import { ChartOptions} from "chart.js";

export const createGradient = (chart:any) => {
  const chartWidth = chart.width ?? 0;
  const chartHeight = chart.width ?? 0;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;


  const gradient = chart.ctx.createRadialGradient(centerX,centerY,0, centerX,centerY, chartWidth/4);
  gradient?.addColorStop(0, '#293C4B0f');
  // gradient?.addColorStop(0.5, '#A8E8FD0f');
  gradient?.addColorStop(1, '#FF6C878f');

  return gradient;
}

export const options: ChartOptions<'polarArea'>  = {
  responsive: true,
  maintainAspectRatio: true,
  events: ['click'],
  elements: {
    line: {
      borderWidth: 0,
      hoverBorderWidth: .1,
      tension: .3
    },
    arc: {
      borderWidth: .5,
      borderColor: '#293C4B',
    },
    point: {
      borderWidth: 0,
      radius: 0
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
        centerPointLabels: true,
        padding: 20,
        font: {
          weight: 'lighter',
          family: 'Jura',
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

export const updateGradient = (chart: any) => {
  if (chart) {
    const chartArea = chart.ctx;
    if (!chartArea) {
      return;
    }

    chart.options.scales.r.pointLabels.font.size =  (chart.width < 600) ? 14 : 16;

    chart.options.backgroundColor = createGradient(chart);
  }

  chart.update();
}
