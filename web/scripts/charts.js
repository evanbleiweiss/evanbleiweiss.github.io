// Playing around with d3

var foodScores = function() {
  var data;
  var foodScoresUri = 'http://data.austintexas.gov/resource/ecmv-9xxi.json?zip_code=78756'; //Use Socrata (SODA) API endpoint to get data

  var width = 500,
      height = 500,
      margin = 50;
  var xRange = d3.time.scale().range([margin,width-margin]).domain([new Date(2010, 01, 01), new Date(2015, 01, 01)]);
  var yRange = d3.scale.linear().range([margin, height-margin]).domain([0, 100]);
  var r=d3.scale.linear().domain([50,200]).range([0,20]);
  
  // Select elements
  var svg = d3
    .select('#svgbox')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height);

  function makeCircles(data) {
    svg.selectAll("circle").data(data).enter()
    .append("circle")
    .attr("cx", function(d) {return xRange(humanTime(+d.inspection_date));})
    .attr("cy", function(d) {return yRange(+d.score);})
    .attr("r",function(d) {return r(+d.score);})
    .append("title")
    .text(function(d) {return d.restaurant_name;});
  }

  //Utility for converting (partial) epoch time to human format
  //might use moment.js if this grows
  function humanTime(input) {
    return new Date(parseFloat(input) * 1000);
  }
  
  // Kick everything off -- 
  // remote request can be written as
  // d3.json(uri, callback);
  //          OR
  // d3.json(uri, function( error, json ) {
  //   if (error) return console.warn(error); 
  // })
  // .on("load", function(json){
  //   PROCESS DATA HERE
  // })
  var dataGrabbler = d3.json(foodScoresUri, makeCircles);
}

foodScores();
