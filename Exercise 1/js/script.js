/**
Ping Pong Game
Mollika Chakraborty

This is a template. You must fill in the title,
author, and this description to match your project!
*/
//global variables 
let bX; //x position ball
let bY; // y position ball
let bW = 30; //width of the ball 
//let bH = 30;

//variables for the players 

let pX;
let pY;
let pW = 20;
let pH = 120;

let pX0;
let pY0;
let speedB = 4;
let ballmovementX = -1;
let ballmovementY = -1;
let speedP = 6;
let mov = 50;
"use strict";

function preload() {

}

function setup() {
createCanvas(1200,800);
bX = width/2;
bY = height/2;
pX = 40;
pY = 400;
pX0 = 1160;
pY0 = 400;

}
function draw() {

    keyPushed();
    keyPressed();


    background(0);
    noFill()
    stroke('#fafbfc');
    strokeWeight(3);
    setLineDash([15,15]);
    line(600,0,600,height);


    fill ('#00FF00');
    noStroke();
    ellipseMode(CENTER);

    ellipse (bX,bY,bW);

    //rectangles 

    fill('#fafbfc');
    noStroke();
    rectMode(CENTER);
    rect(pX,pY,pW,pH);
    rect(pX0, pY0, pW,pH);

    //bouncing of ball calling function 

    bX = bX+(ballmovementX*speedB);
    bY = bY+(ballmovementY*speedB);

    //changing of the movement when hitting the top and bottom boundaries

    if(bY>=height){
        ballmovementY = ballmovementY*-1;
    }

    else if(bY <= 0){
        ballmovementY = ballmovementY*-1;
    }

 

    //setting up boundaries for the rectanglles to not go out of the court completely

    if(pY<=0){
      pY= pY+mov;  
    }

    if(pY>=height){
        pY= pY-mov;  
      }

      if(pY0<=0){
        pY0= pY0+mov;  
      }

      if(pY0>=height){
        pY0= pY0-mov;  
      }

      //settng boundaries for the ball to net let it out of the canvas 

      if(bX <=0){
        bX= bX+mov;
      }

      if(bX >=width){
        bX = bX-mov;
      }

      //the collision of the ball with the sliders or the rectangles 
    
      if(bX>= pX-10 && bX <= pX+10 && bY>= pY-60 && bY<= pY+60){
        ballmovementX = ballmovementX*-1;
      }

      else if(bX>= pX0-10 && bX <= pX0+10 && bY>= pY0-60 && bY<= pY0+60){
        ballmovementX = ballmovementX*-1;
      }

}

function keyPushed(){
    if(key=='w' && keyIsPressed){
        pY= pY-speedP;
    }

    else if(key=='s' && keyIsPressed){
        pY= pY+speedP;
    }
}

function keyPressed(){
    if(keyCode == UP_ARROW && keyIsPressed){
        pY0 = pY0-speedP;
    }

    else if (keyCode == DOWN_ARROW && keyIsPressed){
        pY0 = pY0+speedP;
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
  }

