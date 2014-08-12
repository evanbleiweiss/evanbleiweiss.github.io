library awst;

// main script for site
import 'dart:html';
import 'dart:async';
import "package:json_object/json_object.dart";
/* import 'package:js/js.dart' as js; */
import 'dart:js' as js show context, JsObject; 
/* import 'dart:js' show context, scoped, JsObject; */ 

void main() {
  locateEvan("78756");
  foodScores();
}


// BASIC YQL 
locateEvan(place) {
  var yqlUri = "http://query.yahooapis.com/v1/public/yql";
  var params = "?q=select * from geo.places where text=\"$place\"&format=json";
  HttpRequest.getString(yqlUri+params).then(locationPrintHelper);
}

locationPrintHelper(locationData) {
  var loc = new JsonObject.fromJsonString(locationData);
  /* textInject('#myLocation', "${loc.query.results.place.first.name}, "); */
  /* textInject('#myLocation2', " ${loc.query.results.place.first.admin1.content}"); */
  querySelector('#myLocation').text = loc.query.results.place.first.locality1.content + ', ';
  querySelector('#myLocation2').text = loc.query.results.place.first.admin1.content;
}

// DATA VIZ
foodScores() {
  // D3 EXAMPLE
  /* var dee = js.context['d3']; */
  /* print(js.context['d3']['version']); */
  /* var box = dee.callMethod('select', ["#svgbox"]); */
  /*     box.callMethod('style', ["background-color", "red"]); */ 
  // END D3 Example


  // Another D3 EXAMPLE
  var dee = js.context['d3'];
  var box = dee.callMethod('select', ["#svgbox"])
            .callMethod('append', ['svg:svg'])
            .callMethod('attr', ['width', 400])
            .callMethod('attr', ['height', 300]);
  box.callMethod('append', ['svg:rect'])
     .callMethod('attr', ["x", 100])
     .callMethod('attr', ["y", 100])
     .callMethod('attr', ["height", 100])
     .callMethod('attr', ["width", 200]);
  // END D3 Example


  /* var query = HttpRequest.getString("http://data.austintexas.gov/resource/ecmv-9xxi.json"); */
  /* var scoreData = new JsonObject.fromJsonString(query); */
  /* var scoreData = query['score']; */
  /* print(scoreData); */
  /* // add a script tag for the api required */
  /* ScriptElement script = new Element.tag("script"); */
  /* // add the callback function name to the URL */
  /* script.src = "http://d3js.org/d3.v3.min.js"; */
  /* document.body.children.add(script); // add the script to the DOM */

  /* js.scoped(() { */
  /*   dee.select("#svgbox").style("background-color", "blue"); */
  /* }); */
  
  /* HttpRequest.getString(query).then(( content ) { */
  /*   //DO SOME D3 DATA MUNCHING */
  /*   // figure out if it's better to encapsulate code like this or if the above `locateEvan` helper is better */
  /*   /1* print(content); *1/ */
  /*   js.scoped(() { */
  /*     js.context.d3.select("#svgbox").style("background-color", "teal;"); */
  /*   }); */
  /* }); */
}

// GENERIC HELPERS
textInject(selector, msg) {
  querySelector('$selector').text = '$msg';
}

//
//
//
// TESTING OUT CLASS STRUCTURES
//
//
//
class Details {
  String _location;
  String _name = "Evan";
  
  Details(this._location) {
    locate(_location);
  }

  void locate(loc) {
    var yqlUri = "http://query.yahooapis.com/v1/public/yql";
    var params = "?q=select * from geo.places where text=\"$place\"&format=json";
    HttpRequest.getString(yqlUri+params).then(locationPrintHelper);
  }
}
