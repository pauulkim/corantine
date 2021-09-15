import * as d3 from "d3";
import createSVG from "./scripts/helpers/create_svg";
import LineChart from "./scripts/line_chart";
import BarChart from "./scripts/bar_chart";
import dropdown from "./scripts/helpers/dropdown";

document.addEventListener("DOMContentLoaded", () => {
  // set margins for both charts
  const margin = { top: 30, right: 160, bottom: 35, left: 100 },
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        
  // LINE CHART
  // create svg element for line chart
  const lineID = "line-chart-container";
  const lineSVG = createSVG("#line-chart", lineID, margin, width, height);

  // display default line chart with title
  let line = new LineChart(lineSVG, margin, width, height);
  line.display(30);
  let lineTitle = d3.select("#line-graph-title")
    .text(`Covid Cases and Deaths Globally in the Past 30 Days`);

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
    line = new LineChart(lineSVG, margin, width, height);
    line.display(e.target.value);
    lineTitle 
      .text(`Covid Cases and Deaths Globally in the Past ${e.target.value} Days`);
  });



  // BAR CHART
  // create svg
  const barID = "bar-chart-container";
  const barSVG = createSVG("#bar-chart", barID, margin, width, height);

  // display default
  let bar = new BarChart(barSVG, margin, width, height);
  bar.display("cases");
  let barTitle = d3.select("#bar-graph-title")
    .text(`Top 10 Countries with Highest Number of Covid Cases`);

  // create dropdown
  const category = {"Cases": "cases",
                    "Deaths": "deaths",
                    "Recovered": "recovered",
                    "Tests": "tests"};
  
  let selectedCategory = dropdown("#category", category, "Select a category");

  // event listener for category
  selectedCategory.on("change", e => {
    d3.selectAll(`#${barID} > *`).remove();
    bar = new BarChart(barSVG, margin, width, height);
    bar.display(e.target.value);
    barTitle
      .text(`Top 10 Countries with Highest Number of Covid ${e.target.value[0].toUpperCase() + e.target.value.slice(1)}`);
  });
});