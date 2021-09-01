import * as d3 from "d3";
import LineChart from "./scripts/line_chart";
import dropdown from "./scripts/helpers/dropdown";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = "Welcome to Corantine";

  // *** put into helper function? ***
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
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("id", "base");
  
  // display default line chart
  let line = new LineChart(svgLine, margin, width, height);
  line.display(30);



  // create dropdown (TEST)
  const days = {"30 days": "30", 
                "60 days": "60", 
                "120 days": "120", 
                "240 days": "240", 
                "365 days": "365", 
                "720 days": "720"};

  let selectDays = dropdown("#num-days", days, "Select days passed");

  // d3.select("#num-days")
  //   .append("p")
  //   .text("Select days passed")

  // let selectDays = d3.select("#num-days")
  //   .append("select")

  // days.forEach( day => {
  //   let daysOption = selectDays.append("option")
  //   if (day !== "") daysOption.text(day + " days")
  //   daysOption.property("value", day)
  // })

  selectDays.on("change", e => {
    d3.selectAll("#base > *").remove();
    line = new LineChart(svgLine, margin, width, height);
    line.display(e.target.value);
  })

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