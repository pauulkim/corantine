import * as d3 from "d3";

export const formatLineData = (data, type) => {
  let subset = data[type];

  // map to right keys
  let newData = Object.keys(subset).map( (date) => ({
    date: d3.timeParse("%m/%d/%y")(date),
    value: subset[date]
  }));

  return newData;
};

export const formatBarData = (data, type) => {
  // sort data from highest to lowest based on type
  data.sort( (a, b) => {
    if (a[type] > b[type]) return -1;
    if (a[type] < b[type]) return 1;
    return 0;
  });
  
  // only get top 10
  const topTen = data.slice(0, 10)

  // get right keys
  const newData = topTen.map( dataPoint => ({
    country: dataPoint["country"],
    value: dataPoint[type]
  }));

  return newData;
};