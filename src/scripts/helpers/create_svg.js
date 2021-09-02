import * as d3 from "d3";

const createSVG = (element, id, margin, width, height) => {
  const svg = d3.select(element)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("id", id);
    
  return svg;
};

export default createSVG;