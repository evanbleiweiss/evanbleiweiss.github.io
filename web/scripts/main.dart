library awst;

// main script for site
import 'dart:html';
import 'dart:async';
import "package:json_object/json_object.dart";

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
  var query = "http://data.austintexas.gov/resource/ecmv-9xxi.json";
  HttpRequest.getString(query).then((content) {
    //DO SOME D3 DATA MUNCHING
    // figure out if it's better to encapsulate code like this or if the above `locateEvan` helper is better
    print(content);
  });
}

// GENERIC HELPERS
textInject(selector, msg) {
  querySelector('$selector').text = '$msg';
}

