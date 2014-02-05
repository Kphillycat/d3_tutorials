var data = [2,4,6,8,9,10];

var width = 420,
		barHeight = 20; //SVG elements have widths and heights

var linearScale = d3.scale.linear()
	.domain([0, d3.max(data)]) 
	.range([0, width]); //instead of hardcoding the width.

//SVG has different elements
//select containing elements
//set it's attributes
var chart = d3.select(".chart")
//SVG elements need to told height and width
		.attr("width", width)
		.attr("height", barHeight * data.length); //We want our chart to be as high as 20 pixels

//Select elements and bind the data in one step
var barUpdate = chart.selectAll("g") //g means group in svg for a rectangle and text shape. 
										 .data(data); //SVG has official and unofficial tags

//add new gs to the dom
barUpdate.enter().append("g") 
//we append new things we need to change some attributes
//Behind the scenes iteration, callback functions can take data and index as magical arguments
	.attr("transform", function(d,i){
		return "translate(0," + i * barHeight + ")"; //Needs to be returned as string to set the svg transform attribute. We need to dynamically move the bars based on their position in the array. Move down then draw, move down then draw, etc. Implicit iteration. Similar to ruby block.
	}); 
//Right now there are invisible groups of things. We need rect and text.
//We can add them first then change the attribute

barUpdate.append("rect") //append rectangle to barUpdate. Add a rect to group object g
	.attr("width", linearScale)
	.attr("height", barHeight - 3); //minus 3 looks nicer. Gives buffer between bars.

barUpdate.append("text") // Can't use text align right, have to position use x and y
	.attr("x", function(d){
		return linearScale(d - 1); //put at the end of the bar or the width. minus one pixel so not flush
	})
	.attr("y", barHeight / 2) //vertically aligned middle of the bar
	.attr("dy", ".35em") //Height at which it's determining the center of the text
	.text(function(d){ //give the value of the data we're using
		return d;
	});