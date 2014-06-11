library awst;

// main script for site
import 'dart:html';
//import 'dart:io';
//import 'package:oauth2/oauth2.dart' as oauth2;
//import 'dart:convert' show JSON;
import 'dart:convert';
import 'dart:async';

import "package:json_object/json_object.dart";
//part 'twitter.dart';

void main() {
  /* querySelector('#inputName').onInput.listen(updateBadge); */
  locateEvan("Austin, TX");
//  getLatestTweet();
//  new Uri.https('api.twitter.com', '/1.1/statuses/user_timeline.json?screenname=evanbleiweiss&count=1');
}

/* void updateBadge(Event e) { */
/*   querySelector('#badgeName').text = (e.target as InputElement).value; */
/* } */

locateEvan(place) {
  var yqlUri = "http://query.yahooapis.com/v1/public/yql";
  var params = "?q=select * from geo.places where text=\"${place}\"&format=json";
  HttpRequest.getString(yqlUri+params).then(locationPrintHelper);
}

locationPrintHelper(locationData) {
  var loc = new JsonObject.fromJsonString(locationData);
  //TODO: Move text into template
  textInject('#myLocation', "Coming to you from ${loc.query.results.place.first.name}, ${loc.query.results.place.first.admin1.content}");
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
