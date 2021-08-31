import * as d3 from "d3";

class LineChart {
  constructor(svg, margin, width, height) {
    this.margin = margin;
    this.width = width;
    this.height = height;
    this.svg = svg;
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