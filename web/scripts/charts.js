// Playing around with d3

var foodScores = function() {
  var foodScoresUri = 'http://data.austintexas.gov/resource/ecmv-9xxi.json';

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

  return canvas;
}

foodScores();
