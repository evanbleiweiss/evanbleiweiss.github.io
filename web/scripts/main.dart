library awst;

// main script for site
import 'dart:html';
import 'dart:async';
import "package:json_object/json_object.dart";

//part 'twitter.dart';

void main() {
  locateEvan("78756");
}

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

textInject(selector, msg) {
  querySelector('$selector').text = '$msg';
}

getLatestTweet() {
  var host = "api.twitter.com";
  var path = "/1.1/statuses/user_timeline.json";
  var params = {'screen_name': 'evanbleiweiss', 'count': '1'};
  //  var uri = new Uri.http(host, path, params);
  var uri = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=evanbleiweiss&count=1";
  //  auth();
  HttpRequest.getString(uri).then( (String resp){
    querySelector('#lastTweet').text = resp;
   });
 }
