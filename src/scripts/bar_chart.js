import * as d3 from "d3";
import { formatBarData } from "./helpers/format_data";
import { barMouseover, barMousemove, barMouseLeave } from "./helpers/mouse_hover";

class BarChart {
  constructor(svg, margin, width, height) {
    this.svg = svg;
    this.margin = margin;
    this.width = width;
    this.height = height;
  };

  scaleData(data) {
    const x = d3.scaleLinear()
      .domain([ 0, data[0].value ])
      .range([ 0, this.width ]);

    const y = d3.scaleBand()
      .range([ 0, this.height ])
      .domain(data.map( d => d.country))
      .padding(0.1);

    return [x, y];
  };

  drawAxes(x, y) {
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).ticks(7));
      // .selectAll("text")
      //   .attr("transform", "translate(-10,0)rotate(-45)")
      //   .style("text-anchor", "end");

    this.svg.append("g")
      .call(d3.axisLeft(y));    
  };

  addLabels() {
    // add x axis label
    this.svg.append("text")
      .attr("x", (this.width / 2))
      .attr("y", this.height + this.margin.bottom)
      .attr("class", "axis-label")
      .text("Value");

    // add y axis label
    this.svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin.left)
      .attr("x", 0 - (this.height / 2))
      .attr("dy", "1em")
      .attr("class", "axis-label")
      .text("Country");
  };

  createTooltip() {
    const tooltip = this.svg.append("text")
      .style("opacity", 0)

    return tooltip;
  };

  drawBars(data, x, y, tooltip) {
    this.svg.selectAll("bars")
      .data(data)
      .join("rect")
      .attr("x", x(0))
      .attr("y", d => y(d.country))
      .attr("width", d => x(d.value))
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2")
      .on("mouseover", () => barMouseover(tooltip))
      .on("mousemove", () => barMousemove(tooltip))
      .on("mouseleave", () => barMouseLeave(tooltip));
  };

  display(type) {
    fetch(`https://disease.sh/v3/covid-19/countries`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        const newData = formatBarData(data, type); // format data

        let [x, y] = this.scaleData(newData); // scale data for plotting
        this.drawAxes(x, y); // draw axes
        this.addLabels(); // add labels
        
        // draw bars with hover effect
        let tooltip = this.createTooltip();
        this.drawBars(newData, x, y, tooltip); 
      });
  };
};

export default BarChart;