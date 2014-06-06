library awst;

// main script for site
import 'dart:html';
import 'dart:io';
import 'package:oauth2/oauth2.dart' as oauth2;

//import 'dart:async';

part 'twitter.dart';

void main() {
  /* querySelector('#inputName').onInput.listen(updateBadge); */
  auth();
  getLatestTweet();
//  new Uri.https('api.twitter.com', '/1.1/statuses/user_timeline.json?screenname=evanbleiweiss&count=1');
}

/* void updateBadge(Event e) { */
/*   querySelector('#badgeName').text = (e.target as InputElement).value; */
/* } */


 getLatestTweet() {
  var host = "api.twitter.com";
  var path = "/1.1/statuses/user_timeline.json";
  var params = {'screen_name': 'evanbleiweiss', 'count': '1'};
  //  var uri = new Uri.http(host, path, params);
  var uri = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=evanbleiweiss&count=1";
  HttpRequest.getString(uri).then( (String resp){
    querySelector('#lastTweet').text = resp;
   });
 }


