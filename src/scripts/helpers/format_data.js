import * as d3 from "d3";

export const formatLineData = (data, type) => {
  let subset = data[type];
  let newData = Object.keys(subset).map( (date) => ({
    date: d3.timeParse("%m/%d/%y")(date),
    value: subset[date]
  }));

  return newData;
};

export const formatBarData = (data, type) => {
  data.sort( (a, b) => {
    if (a[type] > b[type]) return -1;
    if (a[type] < b[type]) return 1;
    return 0;
  });


  console.log(data);
};