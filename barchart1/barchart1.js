var data = [1,2,3,4,500,60];
//first make a selection on a container that everything will be in
//d3 represents are document

var chart = d3.select(".chart"); //Find the first match
//next select things to bind data to
var bar = chart.selectAll("div"); //right now holds zero

//Linear scale - referencing the scale function but not invoking it so linearScale is a scale type. Everything after .scale modifies the scale function. Nice safeguard.
var linearScale = d3.scale.linear()
	.domain([0, d3.max(data)]) //d3.max() returns the largest value of the data. Data goes from zero to largest number in data
	.range([0, 420]); //largest we want is 420 pixels. Map this many pixels to the values in the domain

var barUpdate = bar.data(data); //join the data. Put in a variable to use it again to call enter on
//Its the set of information where the nodes are matched. Binding all the data to the divs. Matching up all the data. Represents the idea of mapping. responds to two functions that deal with probs (enter and exit). right now empty object.

//Three ways to deal with the data, enter it, update it, exit it 
//barUpdate talks about the data thats apart of the update in the update lifecycle. Filled with things that are matched up.

//D3 needs to make more div
var barEnter = barUpdate.enter().append("div");
//call .enter on the joined data. barUpdate.enter(); will return all the new divs that are created from the data. .exit() will return all the divs leftover 
//.append() returns the things it's adding. Just the new ones.

//In a bar chart the length or width represents the data
barEnter.style("width", function(d){
	return linearScale(d) + "px"; //css likes strings and units. Using linearScale to appropriately Scale. Scale function takes an argument
});
//style takes the properyty as first arg
// d is a data obj by representing the one element

barEnter.text(function(d){
	return d; //text inside the element is only going to be the element in the data
});
//each functinon is built into d3 for the iteration...you dont have to explicitely tell it. Only have to say what the final thing looks like.

