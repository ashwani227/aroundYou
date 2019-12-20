//Script to get current location

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
console.log("err");
 }
}
lati = document.getElementById("latitude");
long = document.getElementById("longitude");

function showPosition(position) {
	lati.value= position.coords.latitude
	long.value = position.coords.longitude
	lat = position.coords.latitude;
	lng = position.coords.longitude
}
window.onload = getLocation()


