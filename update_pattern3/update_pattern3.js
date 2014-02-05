var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var width = 960,
	height = 500;

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g") 
	.attr("transform", "translate(32," + (height/2) + ")"); 

function update(data){ 
	var text = svg.selectAll("text").data(data, function(d){return d;});
	//the return value of the binding the data is the update then u can call enter and exit on that update
	text.attr("class","update")
	.transition()
      .duration(500)
      .attr("x", function(d, i) { return i * 32; });
	
	//ENTER
	text.enter().append("text") 
		.attr("class","enter")
		.attr("dy",".35em")
		.text(function(d){return d;})
		.style("fill-opacity",1e-6) 
		.attr("y", -60)//Set up initial state before .transition()
		.attr("x", function(d, i){ 
			return i * 32;
		})
	 .transition()
	 	.duration(500)
	 	.attr("y",0)
	 	.style("fill-opacity",1);

	// text.attr("x", function(d, i){ 
	// 		return i * 32;
	// 	});

	text.exit()
		.transition()
			.duration(500)
			.attr("y", 60)
			.style("fill-opacity", 1e-6)
			.remove();
}

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