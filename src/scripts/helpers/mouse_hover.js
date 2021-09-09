import * as d3 from "d3";

export const mouseover = (elements) => {
  elements.forEach( ele => {
    ele[0].style("opacity", 1)
    ele[1].style("opacity", 1)
  });
};
