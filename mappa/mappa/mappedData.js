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
let song;

//the array that will store our ride objects
let ridesArray = [];

function preload(){
  // Load the data
  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');
  song = loadSound('');

}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // Only redraw the meteorites when the map change and not every frame.
  myMap.onChange(drawMeteorites);

}

// The draw loop is fully functional but we are not using it for now.
function draw() {

  //only call the drawMeteorites function in draw if
  //the ridesArray length containes objects (greater than 0)
  //we need to add this in order to clear the hover function text and box
  if(ridesArray.length > 0){
    drawMeteorites();
  }

  //load all the ridesArray objects and call the hover function
  //we need to call the hover function in draw b/c it's not static
  for(let i = 0; i < ridesArray.length; i++){
    ridesArray[i].hover();
  }
}

function drawMeteorites() {
  //clear the array when resized so that the points get repositioned
  //relative to the map size
  ridesArray.splice(0,ridesArray.length);

  // Clear the canvas
  clear();

  //for (let i = 0; i < meteorites.getRowCount(); i++) {
  for (let i = 0; i < 10; i++) {
    // Get the lat/lng of each meteorite
  //  const latitudeDrop = Number(meteorites.getString(i, 'Dropoff Lat'));
    //const longitudeDrop = Number(meteorites.getString(i, 'Dropoff Lng'));
    //const latitudePick = Number(meteorites.getString(i, 'Pickup Lat'));
    //const longitudePick = Number(meteorites.getString(i, 'Pickup Lng'));
    //const pickupTime = String(meteorites.getString(i, 'Trip or Order Status'));
    //Only draw them if the position is inside the current map bounds. We use a
    //Leaflet method to check if the lat and lng are contain inside the current
    //map. This way we draw just what we are going to see and not everything. See
    //getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({lat: latitudeDrop, lng: longitudeDrop})) {
      // Transform lat/lng to pixel position
      const posDrop = myMap.latLngToPixel(latitudeDrop, longitudeDrop);
      const posPick = myMap.latLngToPixel(latitudePick, longitudePick);

      //populate the ridesArray with Rides objects for each ride
      ridesArray.push(new Rides(posPick.x, posPick.y, posDrop.x, posDrop.y, pickupTime));
    }
  }

  //load all the ridesArray objects and call the show function
  //we can call the show function here b/c the dots are static
  for(let i = 0; i < ridesArray.length; i++){
    ridesArray[i].show();
  }

}


//the Rides class/object
class Rides{
  //constructor values are being added from the
  //objects created in the array in the for loop above
  constructor(posPickX, posPickY, posDropX, posDropY, pickup){
    this.posPickX = posPickX;
    this.posPickY = posPickY;
    this.posDropX = posDropX;
    this.posDropY = posDropY;
    this.pickup = pickup;
  }

  //shwo the dots and lines
  show(){
    fill(0,0,0);
    stroke(20);
    stroke(255, 204, 0);

    line(this.posPickX, this.posPickY, this.posDropX, this.posDropY);
    fill(100,200,50);

    ellipse(this.posDropX, this.posDropY, 10, 10);
    fill(193, 66, 66);


    ellipse(this.posPickX, this.posPickY, 10, 10);
    fill(100,200,50);

  }

  //when hovered, show some data
  hover(){
    if(dist(mouseX, mouseY, this.posPickX, this.posPickY) < 5){
      noStroke();
      fill(400);
      rect(this.posPickX + 5, this.posPickY -10, 75, 30);
      fill(0);
      text(this.pickup, this.posPickX + 10, this.posPickY+5);
    }
  }

}
