import * as d3 from "d3";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = "Welcome to Corantine";

  // test dataset
  var dataset1 = [
    [1,1], [12,20], [24,36],
    [32, 50], [40, 70], [50, 100],
    [55, 106], [65, 123], [73, 130],
    [78, 134], [83, 136], [89, 138],
    [100, 140]
  ];
  
  // set constants
  const width = 800;
  const height = 500;
  const margin = 200;
  
  // create svg element for data viz
  const svg = d3.select("#covid-viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // set margins for graph
  const adjWidth = svg.attr("width") - margin
  const adjHeight = svg.attr("height") - margin

  // set the scale
  const xScale = d3.scaleLinear().domain([0, 100]).range([0, adjWidth])
  const yScale = d3.scaleLinear().domain([0, 200]).range([adjHeight, 0])
})