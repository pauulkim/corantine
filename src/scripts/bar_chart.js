import * as d3 from "d3";

class BarChart {
  constructor(svg, margin, width, height) {
    this.svg = svg;
    this.margin = margin;
    this.width = width;
    this.height = height;
  };

  display(type) {
    fetch(`https://disease.sh/v3/covid-19/countries`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        console.log(data);
      });
  };
};

export default BarChart;