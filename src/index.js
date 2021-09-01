import * as d3 from "d3";
import LineChart from "./scripts/line_chart";
import dropdown from "./scripts/helpers/dropdown";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = "Welcome to Corantine";

  // *** put into helper function? ***
  // set dimensions and margins of line chart
  let margin = { top: 40, right: 30, bottom: 35, left: 100 },
      width = 800 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;
  // create svg element for line chart
  const svgLine = d3.select("#line-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("id", "line-chart-container");
  
  // display default line chart
  let line = new LineChart(svgLine, margin, width, height);
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
    d3.selectAll("#line-chart-container > *").remove();
    line = new LineChart(svgLine, margin, width, height);
    line.display(e.target.value);
  });
})