import * as d3 from "d3";

const formatData = (data, type) => {
  let subset = data[type];
  let newData = Object.keys(subset).map( (date) => ({
    date: d3.timeParse("%m/%d/%y")(date),
    value: subset[date]
  }));

  return newData;
};

export default formatData;