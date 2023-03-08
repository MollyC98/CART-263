/**
 * Data Visualization project 
 * Topic: Space Missions 
 * Mollika Chakraborty 
 /* 
 About: This project ahs been done with the help of p5.js reference page, coding train channel 
 tutorials. The data has been taken from kaggle https://www.kaggle.com/datasets/agirlcoding/all-space-missions-from-1957 .
 The latitude and longitude data for the space missions were not available in the csv 
 file therefore https://developers.google.com/maps/documentation/geocoding/start  website has been used to extract the longitude and latitude 
 values and put them in a text file (because they only allowed one email address at a point for limited time 
 to extract data afte that you have buy plans :')). The csv file I selected had more than 4000 data out of which only 
 2456 data is being represented as I couldn't grab the coordinate values of the rest. As discussed in the class
 some datas had incorrect latitutde and longitude, I tried different geocoding websites but none of them 
 were accurate so has to take google api that was closest to the correct values. This led to filtering of many 
 incorrect data from the csv and now the project only showcases approx. 1032 data. I have removed all the data
 that showed invalid values, I hope the rest I am putting here are close to being correct. I am therefor enot using 
 the csv file in the code anymore, it's a new json file but I am keeping the csv file just for future references. 
 
 */

// Load the space missions data from CSV file
// delacares variable to hold space mission data 
let spaceMissions;
// declares variable to hold the coordinates of the latitute and longitude that have been acquired from 
//geocoding website and has been stored in the text file called test.txt
let coordinates;
//empty array to hold the space mission objects 
let spacemissionobjects= [];
// for the later part of the mission where the slider is used to filter through the missions and the user 
//only sees the data as per the years they happened. This array is to store that filtered missions. 
let filterMission = [];
//declares a variable to hold the data currently hovered upon, as in my file when mouse is hovered all the information comes up. 
let hoveredMission = null;
// to set the hover distance where the mouse will detect this data and show information winthin the parameter 
let hoverDistance = 10;

// an empty object to hold the unique locations of the space missions as some of the locations are repeated within 2456 data 
let uniqueLocations = {};
//empty arrays to store the colours for the space missions 
let colors = [];
//empty string to hold the information of the space mission as displayed text 
let displayedText = ""
//to introduce the slider to map through the years 
let slider;

// loading the csv file and the coordinates through the txt file. 
function preload() {
  spaceMissions = loadTable('space_missions.csv', 'csv', 'header');
  spaceMissionsJson = loadJSON("raw_data_final_final.json");
  coordinates = loadStrings('test_final_google.txt');
}
// variable to decalre the Mappa.js map object from leaflet which is an external library
let myMap;
//variable for holding HTML canvas object 
let canvas;
//constant to hold the Mappa.js library from the Leaflet which is the map provider 
const mappa = new Mappa('Leaflet');

// all map options in a single object
// lat and lng are the starting point for the map.
const options = {
  //laitude and longitude 
  lat: 39,
  lng: -90,
  //zoom level 
  zoom: 2,
  //map style
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


// containing the information of the canavas that is overlayed on the map, so the map is the leaflet but the programming is in p5.js that shows the visualization 
function setup(){

  console.log(spaceMissionsJson[0]);
  //the canvas is set to the widow width and widow height 
  canvas = createCanvas(windowWidth,windowHeight); 
  
// Create a tile maapa tile map object with the options declared above
  myMap = mappa.tileMap(options); 

  //map overlayed on the canvas to show the visualizations coded in p5.js but the map is from the leaflet library 
  myMap.overlay(canvas);
  //array of 20 colour vlues from the chroma.js library 
  colors = chroma.scale('Set2').colors(20);
  //HTML element year slider is linked to the slider that is being drawn at the left corner of the map to help user fiter by years 
  slider=document.getElementById ('year-slider')
  // the text of the years appearing bottom of the slider 
  yearText = document.getElementById('year')
  
  /*
  This code block sets an event listener on the "year-slider" element, so that when the user moves the slider, 
  the "yearFilter" variable is updated with the slider's value, the "year" HTML element's text is updated with 
  the "yearFilter" value, and the "filteredMission" array is updated with only the missions that match the 
  selected year. This code block also resets the "hoveredMission" variable to null.
  */
  slider.oninput= function(){
    yearFilter = this.value;
    yearText.innerHTML=yearFilter
    console.log(yearFilter)
    hoveredMission=null
    //console.log(spacemissionobjects[0])
   
    /*
    The condition is implemented using an arrow function with one parameter (spacemissionobject) and a body 
    that compares the year property of spacemissionobject with the yearFilter value, after converting it to 
    an integer using the parseInt() function. This effectively filters out any spacemissionobject that doesn't 
    have a matching year value.The resulting filtered array is then assigned to the variable filteredMission.

    */
   filteredMission = spacemissionobjects.filter(spacemissionobject => spacemissionobject.year === parseInt(yearFilter))
  }
  
  
  
  console.log(coordinates[0].split("*"));
  
  // Loop through each mission in the dataset
//for (let i = 0; i < 2462; i++) {
 // let mission = spaceMissions.getRow(i);
 for (let i = 0; i< 3000; i++){

//new json file that is in sync with the csv file from where latitude, longitude and dates of the space missions is being extracted
  let date  = new Date(spaceMissionsJson[i].Date);
//using this line of the code to filter through the invalid dates of the missions and removing them from the code 
  if(date.toString() !=="Invalid Date"){
   // console.log("invalid")
// getting years of the missions from the dates 
  let year = date.getFullYear();
  //,ission status from the json file 
  let success =spaceMissionsJson[i].MissionStatus;
  //company that launched the missions 
  let company = spaceMissionsJson[i].Company;
  //location of the missions 
  let location = spaceMissionsJson[i].Location;


//(this whole commented out part is the old code that was done based on the csv file, I have only kept this for my future references and understanding of the code)
  // // Extract the necessary information for the mission
  // let date = new Date(mission.getString('Date'));
  // //to take out the year for the filter 
  // let year = date.getFullYear();
  // //status of the mission, sucessful, failure, partial failure 
  // let success = mission.getString('MissionStatus');
  // //really cool companies that launched these missions 
  // let company = mission.getString('Company');
  // //let diameter = map(year, 1957, 2020, 2, 15); // Map the diameter of the ellipse based on the year
  // let location = mission.getString('Location')


  //here I am splitting the longitute and latitute data because it was not structured in the text file 
  let locationCoordinates = coordinates[i].split("*")
  //console.log(location);
  //console.log(locationCoordinates) 
  

//all the info we will see in the canvas 
spacemissionobjects.push(new spacemissionentry(company,location,locationCoordinates[0],locationCoordinates[1],date,spaceMissionsJson[i].Mission,success))
}
   
}
filteredMission = spacemissionobjects
console.log(filteredMission.length)

}

function draw(){
   // Clear the previous canvas on every frame
//console.log(spacemissionobjects[0]);
  clear();
  
  
  //console.log(spacemissionobjects.length)
  /*This initializes a variable called displayedText to an empty string. 
  This variable will be used later to display information about the mission when the mouse hovers over it.
  */
  displayedText = '';

  /*
  This loop iterates over the array filteredMission, which contains all the space missions that occurred in 
  the year specified by the yearFilter variable. For each mission, the display function of the corresponding 
  spacemissionentry object is called, which displays a circle representing the mission on the map.

  */
  for(let i = 0; i<filteredMission.length; i++){
    filteredMission[i].display();
  }
  
  //if (hoveredMission!==null) {

  // Allignment of the display texts that appear for all the information you will see as a user for the space missions 
    textAlign(LEFT, TOP);
    textSize(18);
    fill(0);
    // text(
    //   `${hoveredMission.company}\n${hoveredMission.mission}\n${hoveredMission.date}\n${hoveredMission.missionstatus}`,
    //   mouseX + hoverDistance,
    //   mouseY + hoverDistance
    // );
    text( displayedText,mouseX + hoverDistance, mouseY + hoverDistance)
  }
//}
   
 
//class spacemission entry contains 
class spacemissionentry {
  //constructor function that holds 7 parameters 
  constructor(company,location,locationcoordinates_lat,locationcoordinates_lng,date,mission,missionstatus){
    this.company = company
    this.location = location
    this.locationcoordinates_lat = parseFloat(locationcoordinates_lat)
    this.locationcoordinates_lng = parseFloat(locationcoordinates_lng)
    this.date = date
    this.year = new Date(this.date).getFullYear()
    this.mission = mission
    this.missionstatus = missionstatus
    this.pixelCoordinates = {}
    //the offsets are here to determine the x and y positions through which the ellipse will annalyze the 
    //latitude and longitute and point that in the map and form ellipses there. 
    this.offsetX = random(-15,15);
    this.offsetY = random(-15,15);
    this.color = colors[Math.floor(random(colors.length))]
  }
  display(){
    //console.log(this.date)
    fill(this.color)
    // latitude and longitude data is getting converted to pixels for the ellipses to be drawn as p5.js.
     this.pixelCoordinates= myMap.latLngToPixel(this.locationcoordinates_lat, this.locationcoordinates_lng);
    
    // if (
    //   dist(this.pixelCoordinates.x, this.pixelCoordinates.y, mouseX, mouseY) <= hoverDistance &&
    //   (!hoveredMission || hoveredMission.date < this.date)
    // ) {
      if ( dist(this.pixelCoordinates.x+this.offsetX, this.pixelCoordinates.y+this.offsetY, mouseX, mouseY) <= hoverDistance ) {
     // hoveredMission = this;
     displayedText+=`${this.company}\n${this.mission}\n${this.date}\n${this.missionstatus}\n`
     //console.log(displayedText);
    }

  // Using that position, draw an ellipse
  ellipse(this.pixelCoordinates.x+this.offsetX, this.pixelCoordinates.y+this.offsetY, 20, 20);
}
    
  }