// Initialize the map
var map = L.map('map').setView([41.8240, -71.4128], 8);

// Add a tile layer
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Leaflet Maps',
    maxZoom: 24
}).addTo(map);

// Define the coordinates for different polylines
var routes = {
    route1: [
        { lat: 41.327613, lng: -73.104095 },
        { lat: 41.318545, lng: -73.090525 },
        { lat: 41.312601, lng: -73.079897 },
        { lat: 41.303774, lng: -73.072651 },
        { lat: 41.295962, lng: -73.065355 },
        { lat: 41.2866, lng: -73.073214 },
        { lat: 41.275193, lng: -73.087173 },
        { lat: 41.252604, lng: -73.087043 },
        { lat: 41.235123, lng: -73.101992 },
        { lat: 41.221373, lng: -73.112718 },
        { lat: 41.199582, lng: -73.110591 },
        { lat: 41.177994, lng: -73.121952 },
        { lat: 41.200723, lng: -73.010652 },
        { lat: 41.242939, lng: -72.671764 },
        { lat: 41.260142, lng: -72.578029 },
        { lat: 41.251106, lng: -72.38344 },
        { lat: 41.305489, lng: -71.913612 },
        { lat: 41.315859, lng: -71.748782 },
        { lat: 41.351799, lng: -71.480908 },
        { lat: 41.444865, lng: -71.206781 },
        { lat: 41.473233, lng: -71.040202 },
        { lat: 41.510306, lng: -70.950017 },
        { lat: 41.582892, lng: -70.914514 },
        { lat: 41.579055, lng: -70.810969 },
        { lat: 41.686131, lng: -70.675948 },
        { lat: 41.746092, lng: -70.595333 },
        { lat: 41.772341, lng: -70.559831 },
        { lat: 41.911354, lng: -70.541206 },
        { lat: 42.002505, lng: -70.58709 },
        { lat: 42.084728, lng: -70.629691 },
        { lat: 42.211177, lng: -70.708691 },
        { lat: 42.262766, lng: -70.772947 },
        { lat: 42.274066, lng: -70.823094 },
        { lat: 42.314404, lng: -70.879009 },
        { lat: 42.321323, lng: -70.994864 },
        { lat: 42.370569, lng: -71.047978 },
        { lat: 42.368549, lng: -71.062295 },
        { lat: 42.368741, lng: -71.066482 },
        { lat: 42.366005, lng: -71.070228 },
        { lat: 42.35841, lng: -71.078385 },
        { lat: 42.352913, lng: -71.11329 },
        { lat: 42.359703, lng: -71.116476 },
        { lat: 42.368812, lng: -71.118942 },
        { lat: 42.369427, lng: -71.1244 }
    ],
    route2: [
        [45.4408, 12.3155], // Venice, Italy (Starting point)
        [45.6495, 13.7768], // Trieste, Italy
        [45.2279, 13.5939], // Parenzo (Poreč), Croatia
        [43.5081, 16.4402], // Split, Croatia
        [42.6507, 18.0944], // Dubrovnik, Croatia
        [43.3423, 17.8081], // Mostar, Bosnia and Herzegovina
        [43.8563, 18.4131], // Sarajevo, Bosnia and Herzegovina
        [44.7866, 20.4489], // Belgrade, Serbia
        [42.6977, 23.3219], // Sofia, Bulgaria
        [41.0082, 28.9784], // Constantinople (Istanbul), Turkey
        [40.1885, 29.0610], // Bursa, Turkey
        [39.9334, 32.8597], // Ankara, Turkey
        [39.7483, 37.0165], // Sivas, Turkey
        [39.9042, 41.2675], // Erzurum, Turkey
        [38.0962, 46.2738], // Tabriz, Iran
        [34.7992, 48.5146], // Hamadan, Iran
        [32.6546, 51.6680], // Esfahan, Iran
        [39.6548, 66.9597], // Samarkand, Uzbekistan
        [39.4677, 75.9838], // Kashgar, China
        [42.0280, 113.9959], // Xanadu (Shangdu), China
        [39.9042, 116.4074] // Beijing, China (End point)
    ],
    route3: [
        [-31.4201, -64.1888], // Córdoba, Argentina (Starting point)
        [-37.2632, -56.9712], // Villa Gesell, Buenos Aires, Argentina
        [-40.1631, -71.3490], // San Martín de los Andes, Neuquén, Argentina
        [-38.7396, -72.5984], // Temuco, Chile
        [-37.4621, -72.3615], // Los Ángeles, Chile
        [-33.4489, -70.6693], // Santiago, Chile
        [-33.0472, -71.6127], // Valparaíso, Chile
        [-22.3202, -68.9278], // Chuquicamata, Chile
        [-17.6191, -66.0267], // Tarata, Bolivia
        [-15.7667, -69.7000], // Lake Titicaca, Peru
        [-13.5319, -71.9675], // Cuzco, Peru
        [-11.1237, -75.3497], // San Ramón, Peru
        [-10.5811, -75.4015], // Oxapampa, Peru
        [-12.0464, -77.0428], // Lima, Peru
        [-7.0027, -75.7497], // San Pablo, Peru
        [4.7109, -74.0721], // Bogotá, Colombia
        [10.4880, -66.8792] // Caracas, Venezuela (End point)
    ]
};

// Icons
var squareIcon = L.divIcon({className: 'square-icon', html: '<div style="background-color: navy; width: 10px; height: 10px;"></div>'});
var circleIcon = L.divIcon({className: 'circle-icon', html: '<div style="background-color: navy; width: 26px; height: 26px; border-radius: 50%; border: 5px solid coral;"></div>'})

// Initialize
var polylineLayer = L.layerGroup().addTo(map);
var markersLayer = L.layerGroup().addTo(map);
var newPolyline;
var circularMarkersLayer;

// DROPDOWN

// Event listener for dropdown menu
document.getElementById('routeSelector').addEventListener('change', function () {
    // Get the selected route name
    var selectedRoute = this.value;

    // Calculate the percentage based on the selected route
    var percentage = updatePercentage(selectedRoute);
    console.log(percentage)

    // Update the name, number, and race length based on the selected route
    updateNameAndNumber(selectedRoute);

    // Update the polyline and zoom to the selected route
    updatePolyline(selectedRoute);

    var markerCoordinates = getLatLngAtPercentage(newPolyline, percentage);

    // Clear existing circular markers layer
    if (circularMarkersLayer) {
        circularMarkersLayer.clearLayers();
    }

    // Create a circular marker with a navy background
    var circleMarker = L.marker(markerCoordinates, { icon: circleIcon });

    // Add the circular marker to a new layer group
    circularMarkersLayer = L.layerGroup([circleMarker]).addTo(map);
});


// INITIAL

// Initialize the map with a default polyline (e.g., Route 1)
var initialRoute = 'route1';
var percentage = updatePercentage(initialRoute);
updatePolyline(initialRoute);
updateNameAndNumber(initialRoute);

// Calculate markerCoordinates here based on the selected route
var line = newPolyline.toGeoJSON();
var lineDistance = turf.length(line, { units: 'kilometers' });
var targetDistance = percentage * lineDistance;
var along = turf.along(line, targetDistance, { units: 'kilometers' });

var markerCoordinates = L.latLng(along.geometry.coordinates[1], along.geometry.coordinates[0]);

// Create a circular marker with a navy background and white stroke
var circleMarker = L.marker(markerCoordinates, { icon: circleIcon });

// Add the circular marker to the markersLayer
circleMarker.addTo(markersLayer);

console.log(totalActivitiesData);




// FUNCTIONS

// Function to update the polyline on the map
function updatePolyline(routeName) {
    // Clear the existing polylines from the map
    polylineLayer.clearLayers();
    markersLayer.clearLayers();

    // Get the coordinates for the selected route
    var routeCoordinates = routes[routeName];

    // Create the new polyline and add it to the map
    newPolyline = L.polyline(routeCoordinates, { color: 'navy' }).addTo(polylineLayer);

    // Create square markers for the start and end points
    var startPoint = L.marker(routeCoordinates[0], { icon: squareIcon }).addTo(markersLayer);
    var endPoint = L.marker(routeCoordinates[routeCoordinates.length - 1], { icon: squareIcon }).addTo(markersLayer);

    // Calculate the bounds of the new polyline
    var bounds = newPolyline.getBounds();

    // Add the markers to the bounds calculation
    bounds.extend(startPoint.getLatLng());
    bounds.extend(endPoint.getLatLng());

    // Set the map's view to the bounds of the new polyline with some padding
    map.fitBounds(bounds, { padding: [20, 20] });
}

// Function to update the name, number, and race length based on the selected route
function updateNameAndNumber(selectedRoute) {
    var routeNameElement = document.getElementById('routeName');
    var routeNumberElement = document.getElementById('routeNumber');
    var raceLengthElement = document.getElementById('raceLength');

    // Check the selected route and update the name, number, and race length accordingly
    if (selectedRoute === 'route1') {
        routeNameElement.textContent = 'SwimYaleHarvard';
        routeNumberElement.textContent = totalActivitiesData['SwimYaleHarvard'];
        raceLengthElement.textContent = '368';

    } else if (selectedRoute === 'route2') {
        routeNameElement.textContent = 'RunMarcoPolo';
        routeNumberElement.textContent = totalActivitiesData['RunMarcoPolo'];
        raceLengthElement.textContent = '10,000';
    } else if (selectedRoute === 'route3') {
        routeNameElement.textContent = 'CycleCheGuevara';
        routeNumberElement.textContent = totalActivitiesData['CycleCheGuevara'];
        raceLengthElement.textContent = '8,500';
    }
}

// Function to update the name, number, and race length based on the selected route
function updatePercentage(selectedRoute) {
    var distance;
    var totalDistance;

    // Check the selected route and update the percentage accordingly
    if (selectedRoute === 'route1') {
        totalDistance = 368;
        distance = totalActivitiesData['SwimYaleHarvard'];
    } else if (selectedRoute === 'route2') {
        totalDistance = 10000;
        distance = totalActivitiesData['RunMarcoPolo'];
    } else if (selectedRoute === 'route3') {
        totalDistance = 8500;
        distance = totalActivitiesData['CycleCheGuevara'];
    }



    // Calculate the percentage
    var percentage = (distance / totalDistance);

    console.log("Distance is: " + distance);
    console.log("Total distance is: " + totalDistance);
    console.log("Percentage is: " + (percentage*100).toFixed(0) + "%");
    // Return the calculated percentage
    return percentage;
}

function getLatLngAtPercentage(polyline, percentage) {
    var line = polyline.toGeoJSON();
    var lineDistance = turf.length(line, { units: 'kilometers' });
    var targetDistance = percentage * lineDistance;
    var along = turf.along(line, targetDistance, { units: 'kilometers' });

    var latlng = L.latLng(along.geometry.coordinates[1], along.geometry.coordinates[0]);
    return latlng;
}










