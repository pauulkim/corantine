import * as d3 from "d3";

class LineChart {
  constructor() {
    // set dimensions and margins of graph
    this.margin = { top: 10, right: 30, bottom: 30, left: 90 };
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    // create svg element for data viz
    this.svg = d3.select("#line-chart")
      .append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
  };

  drawAxes(data) {
    // add x axis
    let x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, this.width ]);
  
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));
  
    // add y axis
    let y = d3.scaleLinear()
      .domain([ 0, d3.max(data, function(d) { return d.value })])
      .range([ this.height, 0 ]);
  
    this.svg.append("g")
      .call(d3.axisLeft(y));
  }

  display(numDays) {
    // get data
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${numDays}`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        // format data
        let casesData = data.cases;
        let cases = Object.keys(casesData).map( (date) => ({
          date: d3.timeParse("%m/%d/%y")(date),
          value: casesData[date]
        }));

        // draw axes
        this.drawAxes(cases);
      })
  };
};

export default LineChart; 