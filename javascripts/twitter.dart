part of awst;

auth() {
// These URLs are endpoints that are provided by the authorization
// server. They're usually included in the server's documentation of its
// OAuth2 API.
final authorizationEndpoint =
    Uri.parse("https://api.twitter.com/oauth/authorize");
final tokenEndpoint =
    Uri.parse("https://api.twitter.com/oauth2/token");

// The authorization server will issue each client a separate client
// identifier and secret, which allows the server to tell which client
// is accessing it. Some servers may also have an anonymous
// identifier/secret pair that any client may use.
//
// Note that clients whose source code or binary executable is readily
// available may not be able to make sure the client secret is kept a
// secret. This is fine; OAuth2 servers generally won't rely on knowing
// with certainty that a client is who it claims to be.
final identifier = "15256997-S9F8K3m4ZMVSCbTEKDzeHG4YKNkEVBg20AtyF2qSM";
final secret = "RZf94Fnm1oHvrq4Qq2sDvI62b9iwyuMrxepBhKJbKvT3e";

// This is a URL on your application's server. The authorization server
// will redirect the resource owner here once they've authorized the
// client. The redirection will include the authorization code in the
// query parameters.
final redirectUrl = Uri.parse("http://awst.in");

var credentialsFile = new File("~/.myapp/credentials.json");
return credentialsFile.exists().then((exists) {
  // If the OAuth2 credentials have already been saved from a previous
  // run, we just want to reload them.
  if (exists) {
    return credentialsFile.readAsString().then((json) {
      var credentials = new oauth2.Credentials.fromJson(json);
      return new oauth2.Client(identifier, secret, credentials);
    });
  }

  // If we don't have OAuth2 credentials yet, we need to get the
  // resource owner to authorize us. We're assuming here that we're a
  // command-line application.
  var grant = new oauth2.AuthorizationCodeGrant(
      identifier, secret, authorizationEndpoint, tokenEndpoint);

  // Redirect the resource owner to the authorization URL. This will be
  // a URL on the authorization server (authorizationEndpoint with some
  // additional query parameters). Once the resource owner has
  // authorized, they'll be redirected to `redirectUrl` with an
  // authorization code.
  //
  // `redirect` is an imaginary function that redirects the resource
  // owner's browser.
  return redirect(grant.getAuthorizationUrl(redirectUrl)).then((_) {
    // Another imaginary function that listens for a request to
    // `redirectUrl`.
    return listen(redirectUrl);
  }).then((request) {
    // Once the user is redirected to `redirectUrl`, pass the query
    // parameters to the AuthorizationCodeGrant. It will validate them
    // and extract the authorization code to create a new Client.
    return grant.handleAuthorizationResponse(request.uri.queryParameters);
  })
}).then((client) {
  // Once you have a Client, you can use it just like any other HTTP
  // client.
  return client.read("http://example.com/protected-resources.txt")
      .then((result) {
    // Once we're done with the client, save the credentials file. This
    // ensures that if the credentials were automatically refreshed
    // while using the client, the new credentials are available for the
    // next run of the program.
    return credentialsFile.open(FileMode.WRITE).then((file) {
      return file.writeString(client.credentials.toJson());
    }).then((file) => file.close()).then((_) => result);
  });
}).then(print);

}