import * as d3 from "d3";
import { formatBarData } from "./helpers/format_data";

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
      .call(d3.axisBottom(x));
      // .selectAll("text")
      //   .attr("transform", "translate(-10,0)rotate(-45)")
      //   .style("text-anchor", "end");

    this.svg.append("g")
      .call(d3.axisLeft(y));    
  };

  display(type) {
    fetch(`https://disease.sh/v3/covid-19/countries`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        const newData = formatBarData(data, type); // format data

        let [x, y] = this.scaleData(newData); // scale data for plotting
        this.drawAxes(x, y); // draw axes

        
      });
  };
};

export default BarChart;