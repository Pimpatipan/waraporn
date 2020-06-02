var map;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 13.812104, lng: 100.56464 },
        zoom: 10,
    });

    //infoWindow = new google.maps.InfoWindow;

    //// Try HTML5 geolocation.
    //if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(function (position) {
    //        var pos = {
    //            lat: position.coords.latitude,
    //            lng: position.coords.longitude
    //        };

    //        var currentMarker = new google.maps.Marker({
    //            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    //            map: map
    //        });

    //        currentMarker.setMap(map);
    //        map.setCenter(pos);

    //        $.ajax({
    //            url: apiWeb + '/NearBranchs/' + position.coords.latitude + '/' + position.coords.longitude,
    //            method: 'GET',
    //            headers: header,
    //            success: function (data) {
    //                addmarker(data.detail);
    //                console.log(data.detail)
    //            }
    //        })
    //    }, function () {
    //        handleLocationError(true, infoWindow, map.getCenter());
    //    });
    //} else {
    //    // Browser doesn't support Geolocation
    //    handleLocationError(false, infoWindow, map.getCenter());
    //}
}

//function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//    infoWindow.setPosition(pos);
//    infoWindow.setContent(browserHasGeolocation ?
//        'Error: The Geolocation service failed.' :
//        'Error: Your browser doesn\'t support geolocation.');
//    infoWindow.open(map);
//}

function addmarker(location) {
    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    for (i = 0; i < location.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(location[i].lat, location[i].long),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.close();
                infowindow.setContent('<div class="infowindow-box">' +
                    '<h2 class="infowindow-header">สาขา ' + location[i].name + '</h2>' +
                    '<div class="infowindow-body">' +
                    '<p class="m-0">' + location[i].address + '</p>' +
                    '<p class="m-0">โทร. : ' + location[i].telephone + ' เวลาทำการ ' + location[i].timeService + ' น.</p>' +
                    '<a : href="' + location[i].menuImg +'" target="_blank" class="text-dark link-menu w-30" title="ดูเมนู" >ดูเมนู</a >'+
                    '</div>' +
                    '</div>');
                infowindow.open(map, marker);
            }
        })(marker, i));
        markers.push(marker);

        var latLng = new google.maps.LatLng(location[i].lat, location[i].long);
        map.setCenter(latLng);
    }

    if (location.length > 0) {
        marker.setMap(map);
    }
}