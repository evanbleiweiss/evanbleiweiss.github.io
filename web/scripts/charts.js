// Playing around with d3

var foodScores = function() {
  var data;
  var foodScoresUri = 'http://data.austintexas.gov/resource/ecmv-9xxi.json?zip_code=78756'; //Use Socrata (SODA) API endpoint to get data
  var dataGrabbler = d3.json(foodScoresUri, function(error, json) {
    if (error) return console.warn(error);
    data = json;
    dataMuncher();
  })
  .on("load", function(data){ console.log( data); })
  .get();
                                
  console.log(dataGrabbler);

  var xRange = d3.scale.linear().range ([20, 180]).domain([0, 300]);
  var yRange = d3.scale.linear().range ([20, 180]).domain([0, 300]);
  var dataMuncher = function(data) {
    d3.select('#svgbox');
      

  }

  var canvas = d3
    .select('#svgbox')
    .append('svg:svg')
    .attr('width', 400)
    .attr('height', 300)
    .append('svg:rect')
    .attr('x', 100)
    .attr('y', 100)
    .attr('height', 100)
    .attr('width', 200);

}

foodScores();
