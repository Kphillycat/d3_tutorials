var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
//our data

//set width and height
var width = 960,
	height = 500;

//selection without an svg element. This time we need to create and add it.
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g") //add a single group to the page
	.attr("transform", "translate(32," + (height/2) + ")"); //positioned the g in the middle

//csv would need the data passed in
//step 1. Make update function
function update(data){ //data is a variable that holds alphabet for now
	//step 2. data join
	var text = svg.selectAll("text").data(data, function(d){return d;});
	
	//step 3. Update step. Data you have nodes paired to
	text.attr("class","update");

	//step 4. Enter
	text.enter().append("text") //text svg element
		.attr("class","enter")
		.attr("dy",".35em")
		.text(function(d){return d;}); //Need to update the text on enter not on update

	//Step 5. enter and update
	text.attr("x", function(d, i){ //Need to update the x position on the Update steps
			return i * 32;
		})

	//6. exit
	text.exit().remove();
}

//set up initial display
update(alphabet);

setInterval(function(){
	update(shuffle(alphabet).slice(0, Math.floor(Math.random() * 26))
      .sort())
}, 1500);

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
}