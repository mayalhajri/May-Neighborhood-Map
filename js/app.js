//name of my places
var myLocations = [
    {
        title: 'Wadek',
        lat: 24.69607645,
        lng: 46.69427633,
        type: 'Restaurant'
    },
    {
        title: 'dipndip',
        lat: 24.70406917,
        lng: 46.70363188,
        type: 'Restaurant'
    },
    {
        title: 'TSC Signature',
        lat: 24.70180787,
        lng: 46.6918838,
        type:  'Restaurant'
    },
    {
        title: 'Nino',
        lat: 24.69790897,
        lng: 46.68681979,
        type:  'Restaurant'
    },
    {
        title: 'White Garden Cafe',
        lat: 24.69402944,
        lng: 46.68390155,
        type: 'Cafe'
    }
] 
function AppViewModel() {
var map, clientID, clientSecret;
var self = this;
this.searchTerm = ko.observable("");
this.markers = [];
this.populateInfoWindow = function(marker, infowindow) {
    //the information about pointed marker is got from Foursquare API
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            // Foursquare API Client
            clientID = "2G4BOAVMDDTBVKZOU0WI0IBXSQOCMDTIOWZCKXS4XO1RAC0R";
            clientSecret =
                "3UZMRJ1XEB1WDHZROFUCCIGDJCFMWPVRG5J4FFDWVDNHEV4K";
            // URL for Foursquare API
            var apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&query=' + marker.title +
                '&v=20170708' + '&m=foursquare';
            // Foursquare API will retrieve street name , city , category from json 
            $.getJSON(apiUrl).done(function(marker) {
                var response = marker.response.venues[0];
                self.street = response.location.formattedAddress[0];
                self.city = response.location.formattedAddress[1];
                self.category = response.categories[0].shortName;
// html to display the retrieved values 
                self.htmlContentFoursquare =
                    '<h5 class="content">(' + self.category +
                    ')</h5>' + '<div>' +
                    '<p class="content">' +'Address: '+ self.street + '</p>' +
                    '<p class="content">' + self.city + '</p>' +
                    '</div>' + '</div>';

                infowindow.setContent(self.htmlContent + self.htmlContentFoursquare);
            }).fail(function() {
                // Send alert if fail loading from Foursquare
                alert(
                    " Please refresh your page to try again."
                );
            });
// the place name 
            this.htmlContent = '<div>' + '<h4 class="iw_title">' + marker.title +
                '</h4>';

            infowindow.open(map, marker);
//close click 
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };
// to populateInfoWindow and setAnimation to selected marker 
this.populateAndBounceMarker = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
    // set duration for Animation marker 
        setTimeout((function() {
             this.setAnimation(null);
        }).bind(this), 1300);
    };
//display specific range at google map and also set  a marker on specific places that got from myLocation array objects  
 this.initMap =function(){
    // I take lat and lng from http://www.mapcoordinates.net/en
        var uluru = {lat: 24.70017035, lng: 46.69286013};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        // Set InfoWindow
     this.largeInfoWindow = new google.maps.InfoWindow();
     // to read myLocation array and get all marker 
     for (var i = 0; i < myLocations.length; i++) {
            this.markerTitle = myLocations[i].title;
            this.markerLat = myLocations[i].lat;
            this.markerLng = myLocations[i].lng;
        this.marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: this.markerLat,
                    lng: this.markerLng
                },
                title: this.markerTitle,
                lat: this.markerLat,
                lng: this.markerLng,
                id: i,
                animation: google.maps.Animation.DROP,
            });    
        this.marker.setMap(map);
         // save elements to anthoer array (markers)
        this.markers.push(this.marker);
         //if user click on marker do populateAndBounceMarker function 
        this.marker.addListener('click', this.populateAndBounceMarker);
        }
      };
  this.initMap();
  // this funcation is to retriev all marker element (places name ) and display it on sidemnue 
this.locationsFilter = ko.computed(function() {
        var result = [];
        for (var i = 0; i < this.markers.length; i++) {
            var markerLocation = this.markers[i];
        //if user type in search box it will display only the places that user search for and hiden other places
            if (markerLocation.title.toLowerCase().includes(this.searchTerm().toLowerCase())) {
                result.push(markerLocation);
                this.markers[i].setVisible(true);
            } else {
                this.markers[i].setVisible(false);
            }
        }
        return result;
    }, this);
}
// here will start AppViewModel() to apply 
function startApp() {
    ko.applyBindings(new AppViewModel());
}
//that handel error for loading google map 
function errorHandling() {
	alert("Google Maps has failed to load. Please check your internet connection and try again.");
}