import * as d3 from "d3";

export const mouseover = elements => {
  elements.forEach( ele => {
    ele[0].style("opacity", 1)
    ele[1].style("opacity", 1)
  });
};

export const mousemove = (elements, x, y) => {
  // find closest x index of mouse
  const bisect = d3.bisector( d => d.date );

  // get the right x coordinate in date form
  const x0 = x.invert(d3.pointer(event)[0]);


  console.log(x0)
};


//   var i = bisect.left(cases, x0);
//   const selectedCases = cases[i]

//   var j = bisect.left(deaths, x0);
//   const selectedDeaths = deaths[i]
//   focus
//     .attr("cx", x(selectedCases.date))
//     .attr("cy", y(selectedCases.value))
  
//   focus2
//     .attr("cx", x(selectedDeaths.date))
//     .attr("cy", y(selectedDeaths.value))

//   focusText
//     .html("x:" + selectedCases.date + "  -  " + "y:" + selectedCases.value)
//     .attr("x", x(selectedCases.date)+15)
//     .attr("y", y(selectedCases.value))



// function mouseout() {
        //   focus.style("opacity", 0)
        //   focus2.style("opacity", 0)
        //   focusText.style("opacity", 0)
        // }