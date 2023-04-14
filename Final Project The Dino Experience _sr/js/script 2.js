/**
Final Project, The Dino Experience 
Negar and Mollika 

This is a template. You must fill in the title,
author, and this description to match your project!
*/

//////Global Variables 


//// Game Controls 

let stage = 0; 

/// Players 

let p1X = 750 // player 1 x position 
let p1Y = 775 // player 1 y position 
let pWidth = 20;
let pHeight = 60;

// stairs for jumping 

let sX1 = 375;
let sY1 = 700;
let bWidth = 300;
let bHeight = 50;


//// set up 
function setup() {


  createCanvas(1500,1000);
  rectMode(CENTER);
  textAlign(CENTER);
} // set up close 

//// draw 

function draw() {

  if(stage == 0){
    game();
  }
} //draw close 

// game function begins 

function game(){
  background(52, 110, 235);// blue color 
  noStroke();
  fill(11, 6, 92);
  rect(width/2, 450, width, 100);
}