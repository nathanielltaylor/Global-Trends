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

    // var trends = "hello";

    // if (Trends.find().count == 0) {
      var all_trends = {};

      T.get('trends/available',
      function(err, data, response) {
        var locations = data;

        for (i = 0; i < 5; i++) {
          var trends_per_place = [];
          var woeid = locations[i]["woeid"];
          console.log(woeid);
          T.get('trends/place',
          {
            id: locations[i]["woeid"],
          },
          function(err, data, response){
            var trend_name = data[0]["trends"][0]["name"];
            console.log(trend_name);
            trends_per_place.push(trend_name)
            console.log(trends_per_place)
          }
        );
        all_trends[woeid.toString()] = trends_per_place;
        }
        // return all_trends;
      });

      console.log(all_trends);


      // for (i = 0; i < trends.length; i++) {
      //   Trends.insert({
      //     trendObject: trends[i]
      //   });
      // }
    // }
    // console.log(trends)
      //
      // var trends = Trends.find();
      // console.log(trends)

    });

  }
