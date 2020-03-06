

// Options for map
let options = {
  lat: 41.8781,
  lng: -87.6298,
  zoom: 12,
  //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  //  style: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
  //style: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
  style: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
  // style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
let mappa = new Mappa('Leaflet');
let myMap;

let canvas;
let meteorites;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Load the data
  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawMeteorites);

  fill(0,0,0);
  stroke(20);
  stroke(255, 204, 0);

}

// The draw loop is fully functional but we are not using it for now.
function draw() {

//const pos = myMap.latLngToPixel(41.892530, -87.619768);

//line(posPick.x, posPick.y, posDrop.x, posDrop.y);
}

function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    const latitudeDrop = Number(meteorites.getString(i, 'Dropoff Lat'));
    const longitudeDrop = Number(meteorites.getString(i, 'Dropoff Lng'));
    const latitudePick = Number(meteorites.getString(i, 'Pickup Lat'));
    const longitudePick = Number(meteorites.getString(i, 'Pickup Lng'));

    //Only draw them if the position is inside the current map bounds. We use a
    //Leaflet method to check if the lat and lng are contain inside the current
    //map. This way we draw just what we are going to see and not everything. See
    //getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitudeDrop, lng: longitudeDrop})) {
      // Transform lat/lng to pixel position
      const posDrop = myMap.latLngToPixel(latitudeDrop, longitudeDrop);
    const posPick = myMap.latLngToPixel(latitudePick, longitudePick);
      // Get the size of the meteorite and map it. 60000000 is the mass of the largest
      // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
       let size = meteorites.getString(i, 'mass (g)');
       size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
       line(posPick.x, posPick.y, posDrop.x, posDrop.y);
    }
  }
}
