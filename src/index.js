document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = "Welcome to Pandemic";

  fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
    .then( res => res.json())
    .then( data => console.log(data))

  // // covid response
  // fetch("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-03-06/2021-03-06")
  //   .then( res => res.json())
  //   .then( data => console.log(data))
  
})