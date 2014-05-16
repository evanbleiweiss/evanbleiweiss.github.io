// main script for site
import 'dart:html';

void  main() {
  /* querySelector('#inputName').onInput.listen(updateBadge); */
  setLinks()
}

/* void updateBadge(Event e) { */
/*   querySelector('#badgeName').text = (e.target as InputElement).value; */
/* } */

void setLinks() {
  ['twitter' : 'twitter.com/evanbleiweiss', 'github' : 'github.com/evanbleiweiss']
}

void getLatestTweet() {
  var url = "https://api.twitter.com/1.1/statuses/user_timeline.json"
  Map params = {'screenname': 'evanbleiweiss', 'count': 1}
  
}
