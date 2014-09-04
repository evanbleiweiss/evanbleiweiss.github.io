// Playing around with d3

var foodScores = function() {
  var data;
  var foodScoresUri = 'http://data.austintexas.gov/resource/ecmv-9xxi.json?zip_code=78756&restaurant_name=uchiko'; //Use Socrata (SODA) API endpoint to get data

  var width = 500,
      height = 250,
      margin = 50,
      xRange = d3.time.scale().range([margin,width-margin]).domain([new Date(2011, 08, 15), new Date(2015, 01, 01)]),
      yRange = d3.scale.linear().range([height-margin, margin]).domain([77, 100]);

  // Primary selection. All others are subselect
  var svg = d3
    .select('#svgbox')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height);

  function makeCircles(data) {
    var r=d3.scale.linear().domain([50,200]).range([0,20]);

    svg.selectAll("circle").data(data).enter()
    .append("circle")
    .attr("cx", function(d) {return xRange(humanTime(+d.inspection_date));})
    .attr("cy", function(d) {return yRange(+d.score);})
    .attr("r",function(d) {return r(+d.score);})
    .append("title")
    .text(function(d) {return d.restaurant_name +" "+ d.score +" "+ humanTime(+d.inspection_date);});
  }

  function makeLines(data) {
    var line = d3.svg.line()
      .x(function(d) { return xRange(humanTime(+d.inspection_date)); })
      .y(function(d) { return yRange(+d.score); });

    svg
      .selectAll('svg')
      .data(data.sort(function(a,b) { return +a.inspection_date- +b.inspection_date; }))
      .enter()
      .append("svg:path")
      .attr("class", "line")
      .attr("d", line(data))
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr('fill', 'none')
      .append("title")
      .text(function(d) {return d.score +" "+ humanTime(+d.inspection_date);});
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
  var dataGrabbler = d3.json(foodScoresUri, makeLines);
  
  // makeLines(data);
}

foodScores();
