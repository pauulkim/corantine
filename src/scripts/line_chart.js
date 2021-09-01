import * as d3 from "d3";
import formatLineData from "./helpers/format_data";

class LineChart {
  constructor(svg, margin, width, height) {
    this.svg = svg;
    this.margin = margin;
    this.width = width;
    this.height = height;
  };

  scaleData(data) {
    let x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, this.width ]);
    
    let y = d3.scaleLinear()
      .domain([ 0, d3.max(data, function(d) { return d.value })])
      .range([ this.height, 0 ]);

    return [x, y];
  };
  
  drawAxes(x, y) {
    // add x axis
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));
    
    // add y axis
    this.svg.append("g")
      .call(d3.axisLeft(y));
  };

  addLabels(numDays) {
    // add title
    this.svg.append("text")
      .attr("x", (this.width / 2))
      .attr("y", 0 - (this.margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .text(`Number of Covid Cases Globally in the Past ${numDays} Days`);

    // add x axis label
    this.svg.append("text")
      .attr("x", (this.width / 2))
      .attr("y", this.height + this.margin.bottom)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Date");

    // add y axis label
    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin.left)
      .attr("x", 0 - (this.height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Value");
  };

  drawLines(data, x, y, color) {
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
      );
  };

  display(numDays) {
    // get data
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${numDays}`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        // format case and death data
        let cases = formatLineData(data, "cases");
        let deaths = formatLineData(data, "deaths");

        // get scaling functions to plot
        let [x, y] = this.scaleData(cases);
        // draw axes 
        this.drawAxes(x, y); 
        // add labels
        this.addLabels(numDays);
        // draw lines
        this.drawLines(cases, x, y, "steelblue");
        this.drawLines(deaths, x, y, "red");
      })
  };
};

export default LineChart; 