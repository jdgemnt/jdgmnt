import {StateProperty} from "../common/state";
import {SkillRating} from "../model/skill";
import {Chart, ChartData} from "chart.js";

export const updateRating = (rating: StateProperty<SkillRating>, chartData: ChartData, chart: Chart | undefined) => {
  rating?.val$.subscribe((rating) => {
    chartData.labels = rating.labels;

    rating.ratings.forEach((r, i) => {
      chartData.datasets[i].data = r.values;
    })

    chart?.update();
  });
}
