import * as d3 from "d3";

// for line chart
export const lineMouseover = elements => {
  elements.forEach( ele => {
    ele.circle.style("opacity", 1)
    ele.text.style("opacity", 1)
  });
};

export const lineMousemove = (elements, x, y) => {
  // find closest x index of mouse
  const bisect = d3.bisector( d => d.date );
  // get the right x coordinate in date form
  const x0 = x.invert(d3.pointer(event)[0]);

  elements.forEach( ele => {
    // get the index of the current moused over date
    const i = bisect.left(ele.data, x0);
    // select the actual data point from index
    const selectedData = ele.data[i]; 
    
    // add coordinates for hover circle
    ele.circle
      .attr("cx", x(selectedData.date))
      .attr("cy", y(selectedData.value));

    // add text to hover
    ele.text
      .attr("x", x(selectedData.date) + 5)
      .attr("y", y(selectedData.value) - 15)
      .style("font-size", "14px")
      .text(`${d3.timeFormat("%b %d, %Y")(selectedData.date)}: ${selectedData.value}`);
      
    });  
  };
  
  export const lineMouseout = elements => {
    elements.forEach( ele => {
      ele.circle.style("opacity", 0);
      ele.text.style("opacity", 0);
    });
  };
  
  
  
  // for bar chart
  export const barMouseover = (tooltip) => {
    // get values of selected bar
    const selectedData = event.path[0].__data__;
    // make hover text in the very front
    tooltip.raise();
    
    tooltip
      .text(`${selectedData.country}: ${selectedData.value}`)
      .style("font-size", "14px")
      .style("opacity", 1);
};

export const barMousemove = tooltip => {
  const mouseLocation = d3.pointer(event);

  tooltip
    .attr("x", mouseLocation[0] + 15)
    .attr("y", mouseLocation[1]);
};

export const barMouseLeave = tooltip => {
  tooltip
    .style("opacity", 0);
};