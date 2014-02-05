//Using external data
var width = 420,
		barHeight = 20; //SVG objs need width and height. Don't know hieght yet but we can set a barHeight to scale

var linearScale = d3.scale.linear()
		.range([0, width]); //Can set range since we know the width
		//domain can't be set since we don't the max y
var chart = d3.select(".chart") //SVG object
	.attr("width",width);

//Load data! Everything in the visualization happens in the callback function
d3.csv("data.csv", type, function(error, data){ //Each value is read as a string. 2nd arg is used to coerce data to number. Then a function to call one data is ready
	linearScale.domain([0, d3.max(data, function(d) { return d.value; })]);
	chart.attr("height", data.length * barHeight); //How to tall to make it depends on how many bars. Data.length gives us the number of bars
	var bar = chart.selectAll("g") //We have to select which element we are joining are data to. G"
		.data(data)
		.enter().append("g")
		.attr("transform", function(d, i){ //callback functions take the data as an arg cuz we bound the data
			return "translate(0," + i * barHeight + ")"; //Tells the bars to stack
		}); //SVG ele don't know about each other so we need to give it positioning
	
	bar.append("rect")
		.attr("width", function(d){return linearScale(d.value);})// width is a function of the value from the csv file. linearScale translates the scale value.
		.attr("height", barHeight -1);

	bar.append("text")
		.attr("x", function(d){return linearScale(d.value) - 1; }) //put at the end of the bar or the width. minus one pixel so not flush
		.attr("y", barHeight / 2) //vertically aligned middle of the bar
		.attr("dy", ".35em") //Height at which it's determining the center of the text
		.text(function(d){ //give the value of the data we're using
			return d.value;
		});

}); 

function type(d){
	d.value = +d.value; //parseInt(d.value)...Number() creates a new number object.
	return d;
}