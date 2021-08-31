import * as d3 from "d3";
import LineChart from "./scripts/line_chart"

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = "Welcome to Corantine";

  // set dimensions and margins of line chart
  let margin = { top: 10, right: 30, bottom: 30, left: 90 },
      width = 800 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

  // create svg element for line chart
  const svgLine = d3.select("#line-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // display line chart
  let line = new LineChart(svgLine, margin, width, height);
  line.display(700);

  // create dropdown
  


  // // add text
  // // title
  // svg.append("text")
  //   .attr("x", width / 2)
  //   .attr("y", 50)
  //   .attr("text-anchor", "middle")
  //   // .style("font-family", "Helvetica")
  //   .style("font-size", 20)
  //   .text("Test title")
  // // x-axis
  // svg.append("text")
  //   .attr("x", width / 2)
  //   .attr("y", height - 50)
  //   .attr("text-anchor", "middle")
  //   // .style("font-family", "Helvetica")
  //   .style("font-size", 15)
  //   .text("x-axis")
  // // y-axis
  // svg.append("text")
  //   .attr("text-anchor", "middle")
  //   .attr("transform", "translate(60," + height / 2 + ") rotate(-90)")
  //   // .style("font-family", "Helvetica")
  //   .style("font-size", 15)
  //   .text("y-axis")
    


})