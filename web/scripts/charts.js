// Playing around with d3

var foodScores = function() {
  var data;
  var foodScoresUri = 'http://data.austintexas.gov/resource/ecmv-9xxi.json?zip_code=78756'; //Use Socrata (SODA) API endpoint to get data

  var xRange = d3.scale.linear().range ([20, 180]).domain([0, 300]);
  var yRange = d3.scale.linear().range ([20, 180]).domain([0, 300]);
// EXPERIMENT
  var width = 500,
      height = 500,
      margin = 50;
  var x=d3.scale.linear().domain([0,100]).range([margin,width-margin]); //TODO: Make this a time scale - https://github.com/mbostock/d3/wiki/Time-Scales
  var y=d3.scale.linear().domain([0,100]).range([height-margin,margin]);
  var r=d3.scale.linear().domain([0,500]).range([0,20]);
  
  // Select elements
  var svg = d3
    .select('#svgbox')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height)
    // .append('svg:rect') // and draw a box
    // .attr('x', 100)
    // .attr('y', 100)
    // .attr('height', 300)
    // .attr('width', 400);
// EOE
  var dataMuncher = function(data) {
    svg.selectAll("circle").data(data).enter()
    .append("circle")
    .attr("cx",function(d) {return xRange(Date(+d.inspection_date));})
    .attr("cy",function(d) {return yRange(+d.score);})
    .attr("r",function(d) {return r(100);})
      .append("title")
      .text(function(d) {return d.restaurant_name;});
    
    // d3.text("hi").select('#svgbox');
    // for ( var prop in data[0] ) {
    //   console.log(prop);
    // }
  }
  // could be written as
  // d3.json(uri, callback);
  //          OR
  // d3.json(uri, function( error, json ) {
  //   if (error) return console.warn(error); 
  // })
  // .on("load", function(json){
  //   PROCESS DATA HERE
  // })
  var dataGrabbler = d3.json(foodScoresUri, dataMuncher);
}

foodScores();
