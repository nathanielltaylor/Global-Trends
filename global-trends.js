Trends = new Mongo.Collection("trends");

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();

  });

  Template.body.helpers({
    trendMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(23.888643,-32.689819),
          zoom: 3
        };
      }
    }
  });

  Template.body.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('trendMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });

  function getTrends() {

  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var Twit = Meteor.npmRequire('twit');

    var T = new Twit({
      consumer_key:         consumerKey, // API key
      consumer_secret:      consumerSecret, // API secret
      access_token:         accessToken,
      access_token_secret:  accessSecret
    });

    if (Trends.find().count == 0) {
      var trends = T.get('trends/available',
      function(err, data, response) {
        return data
      });

      for (i = 0; i < trends.length; i++) {
        Trends.insert({
          trendObject: trends[i]
        });
      }}

      var trends = Trends.find();
    });

  }
