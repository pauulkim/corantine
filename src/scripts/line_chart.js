class LineChart {
  constructor(svg) {
    this.svg = svg;
    // this.numDays = numDays;
  };

  display(numDays) {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${numDays}`)
      .then( apiResponse => apiResponse.json() )
      .then( data => console.log(data))
  };
};

export default LineChart; 