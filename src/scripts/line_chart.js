import * as d3 from "d3";

class LineChart {
  constructor(svg) {
    this.svg = svg;
    // this.numDays = numDays;
  };

  display(numDays) {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${numDays}`)
      .then( apiResponse => apiResponse.json() )
      .then( data => {
        let newData = data["cases"];
        let cases = Object.keys(newData).map( (date) => ({
          date: d3.timeParse("%m/%d/%y")(date),
          count: newData[date]
        }));
        console.log(cases)
      })
  };
};

export default LineChart; 