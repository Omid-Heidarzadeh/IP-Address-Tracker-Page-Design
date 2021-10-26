// Define and initialize map
var map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var mapMarker = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56]
});

export function updateMap(lat, lng, zoom) {
  map.setView({ lat, lng }, zoom);
  L.marker({ lat, lng }, { icon: mapMarker }).addTo(map);
}
