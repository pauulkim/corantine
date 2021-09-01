import * as d3 from "d3";

const dropdown = (element, options, text) => {
  const ele = d3.select(element);
  ele.append("p").text(text);
  const select = ele.append("select");

  // add option elements to select element
  for (let i in options) {
    let option = select.append("option");
    option.text(i);
    option.property("value", options[i]);
  };

  return select;
};

export default dropdown;