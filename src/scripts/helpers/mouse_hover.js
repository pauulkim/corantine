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

// set the dimensions and margins of the graph
// var margin = {top: 10, right: 30, bottom: 20, left: 50},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Parse the Data
// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {

//   // List of subgroups = header of the csv files = soil condition here
//   var subgroups = data.columns.slice(1)

//   // List of groups = species here = value of the first column called group -> I show them on the X axis
//   var groups = d3.map(data, function(d){return(d.group)}).keys()

//   // Add X axis
//   var x = d3.scaleBand()
//       .domain(groups)
//       .range([0, width])
//       .padding([0.2])
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).tickSizeOuter(0));

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([0, 60])
//     .range([ height, 0 ]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // color palette = one color per subgroup
//   var color = d3.scaleOrdinal()
//     .domain(subgroups)
//     .range(['#C7EFCF','#FE5F55','#EEF5DB'])

//   //stack the data? --> stack per subgroup
//   var stackedData = d3.stack()
//     .keys(subgroups)
//     (data)




//   // ----------------
//   // Create a tooltip
//   // ----------------
//   var tooltip = d3.select("#my_dataviz")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "1px")
//     .style("border-radius", "5px")
//     .style("padding", "10px")

//   // Three function that change the tooltip when user hover / move / leave a cell
//   var mouseover = function(d) {
//     var subgroupName = d3.select(this.parentNode).datum().key;
//     var subgroupValue = d.data[subgroupName];
//     tooltip
//         .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
//         .style("opacity", 1)
//   }
//   var mousemove = function(d) {
//     tooltip
//       .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
//       .style("top", (d3.mouse(this)[1]) + "px")
//   }
//   var mouseleave = function(d) {
//     tooltip
//       .style("opacity", 0)
//   }




//   // Show the bars
//   svg.append("g")
//     .selectAll("g")
//     // Enter in the stack data = loop key per key = group per group
//     .data(stackedData)
//     .enter().append("g")
//       .attr("fill", function(d) { return color(d.key); })
//       .selectAll("rect")
//       // enter a second time = loop subgroup per subgroup to add all rectangles
//       .data(function(d) { return d; })
//       .enter().append("rect")
//         .attr("x", function(d) { return x(d.data.group); })
//         .attr("y", function(d) { return y(d[1]); })
//         .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//         .attr("width",x.bandwidth())
//         .attr("stroke", "grey")
//       .on("mouseover", mouseover)
//       .on("mousemove", mousemove)
//       .on("mouseleave", mouseleave)