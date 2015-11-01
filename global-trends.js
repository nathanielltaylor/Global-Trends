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

   //  search twitter for all tweets containing the word 'banana'
   //  since Nov. 11, 2011
   T.get('search/tweets',
       {
           q: 'banana since:2011-11-11',
           count: 100
       },
       function(err, data, response) {
           console.log(data);
       }
   );
  });
}
