function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
    } else {
        handleLocationError("No geoLocation")
    }
}

function handleLocationError(error) {
    $('#weather-description').text('Error');
    $('weather-image').hide();
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var baseUrl = `api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&appid={API key}`;
    var weatherKey = '6cca3bc02067fc41bf1f5065d94d97d4';

    fetch(baseUrl)
        .then(function (response) {
            return response.json();
        })
        .then(funciton(response))


}