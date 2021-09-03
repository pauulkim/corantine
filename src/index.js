import * as d3 from "d3";
import createSVG from "./scripts/helpers/create_svg";
import LineChart from "./scripts/line_chart";
import BarChart from "./scripts/bar_chart";
import dropdown from "./scripts/helpers/dropdown";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = "Welcome to Corantine";

  // LINE CHART
  // set margins for line chart
  const lineMargin = { top: 40, right: 100, bottom: 35, left: 100 },
        lineWidth = 800 - lineMargin.left - lineMargin.right,
        lineHeight = 450 - lineMargin.top - lineMargin.bottom;

  // create svg element for line chart
  const lineID = "line-chart-container";
  const lineSVG = createSVG("#line-chart", lineID, lineMargin, lineWidth, lineHeight);

  // display default line chart
  let line = new LineChart(lineSVG, lineMargin, lineWidth, lineHeight);
  line.display(30);

  // create dropdown for linechart
  const days = { "30 days": 30, 
                 "60 days": 60, 
                 "120 days": 120, 
                 "240 days": 240, 
                 "365 days": 365, 
                 "720 days": 720 };

  let selectedDays = dropdown("#num-days", days, "Select days passed");

  // event listener for days selected
  selectedDays.on("change", e => {
    d3.selectAll(`#${lineID} > *`).remove();
    line = new LineChart(lineSVG, lineMargin, lineWidth, lineHeight);
    line.display(e.target.value);
  });



  // BAR CHART
  // set margins
  const barM = { top: 20, right: 30, bottom: 40, left: 90 },
        barW = 900 - barM.left - barM.right,
        barH = 400 - barM.top - barM.bottom;

  // create svg
  const barID = "bar-chart-container";
  const barSVG = createSVG("#bar-chart", barID, barM, barW, barH);

  // display default
  let bar = new BarChart(barSVG, barM, barW, barH);
  bar.display("cases");
})