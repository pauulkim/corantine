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

  display(type) {
    fetch(`https://disease.sh/v3/covid-19/countries`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        const newData = formatBarData(data, type); // format data

        let [x, y] = this.scaleData(newData);

        console.log(newData);
        console.log(x);
        console.log(y);
      });
  };
};

export default BarChart;