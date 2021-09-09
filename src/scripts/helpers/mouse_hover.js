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




  // Three function that change the tooltip when user hover / move / leave a cell
  // var mouseover = function(d) {
  //   var subgroupName = d3.select(this.parentNode).datum().key;
  //   var subgroupValue = d.data[subgroupName];
  //   tooltip
  //       .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
  //       .style("opacity", 1)
  // }
  // var mousemove = function(d) {
  //   tooltip
  //     .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
  //     .style("top", (d3.mouse(this)[1]) + "px")
  // }
  // var mouseleave = function(d) {
  //   tooltip
  //     .style("opacity", 0)
  // }




  // // Show the bars
  // svg.append("g")
  //   .selectAll("g")
  //   // Enter in the stack data = loop key per key = group per group
  //   .data(stackedData)
  //   .enter().append("g")
  //     .attr("fill", function(d) { return color(d.key); })
  //     .selectAll("rect")
  //     // enter a second time = loop subgroup per subgroup to add all rectangles
  //     .data(function(d) { return d; })
  //     .enter().append("rect")
  //       .attr("x", function(d) { return x(d.data.group); })
  //       .attr("y", function(d) { return y(d[1]); })
  //       .attr("height", function(d) { return y(d[0]) - y(d[1]); })
  //       .attr("width",x.bandwidth())
  //       .attr("stroke", "grey")
  //     .on("mouseover", mouseover)
  //     .on("mousemove", mousemove)
  //     .on("mouseleave", mouseleave)