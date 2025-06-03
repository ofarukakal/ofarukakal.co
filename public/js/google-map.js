var google;

function init() {
    // Get the HTML DOM element that will contain your map 
    var mapElement = document.getElementById('map');
    
    // If map element is not found, return early
    if (!mapElement) {
        return; // Silently return if no map element exists
    }

    try {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
        var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
        // 39.399872
        // -8.224454
        
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 7,

            // The latitude and longitude to center the map (always required)
            center: myLatlng,

            // How you would like to style the map. 
            scrollwheel: false,
            styles: [
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "hue": "#ff0000"
                        }
                    ]
                }
            ]
        };

        

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
        
        var addresses = ['New York'];

        for (var x = 0; x < addresses.length; x++) {
            $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x], null, function (data) {
                var p = data.results[0].geometry.location
                var latlng = new google.maps.LatLng(p.lat, p.lng);
                new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: 'images/loc.png'
                });
            });
        }
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

// Use modern event listener instead of deprecated addDomListener
window.addEventListener('load', init);