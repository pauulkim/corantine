import * as d3 from "d3";

class LineChart {
  constructor(svg, margin, width, height) {
    this.svg = svg;
    this.margin = margin;
    this.width = width;
    this.height = height;
    // this.numDays = numDays;
  };

  display(numDays) {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${numDays}`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        // format data
        let subset = data["cases"];
        let newData = Object.keys(subset).map( (date) => ({
          date: d3.timeParse("%m/%d/%y")(date),
          value: subset[date]
        }));

        // add x axis
        let x = d3.scaleTime()
          .domain(d3.extent(newData, function(d) { return d.date; }))
          .range([ 0, this.width ])

        this.svg.append("g")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3.axisBottom(x))

      })
  };
};

export default LineChart; 