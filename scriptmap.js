var map = L.map("map").setView([51.24484689236374, 4.416620956582928], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  // initial zoom level
  zoom: 7,
  minZoom: 5,
  maxZoom: 15,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var pin = L.icon({
  iconUrl: "src/pin.png",

  iconSize: [38, 45], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

L.marker([51.24550704477479, 4.416994867315927], { icon: pin }).addTo(map);

var pin1 = L.icon({
  iconUrl: "src/pin.png",

  iconSize: [38, 45], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

L.marker([51.233096835721526, 4.437864176339742], { icon: pin1 }).addTo(map);
