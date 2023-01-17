
//Ping Pong Game
//Mollika Chakraborty

/*This code has been written with help of p5.js reference page for the complex details like 
angular direction changes of the ball, collision with the squares and creating a dotted line in the middle of the court*/

//global variables 
let bX; //x position ball
let bY; // y position ball
let bW = 30; //width of the ball 

//variables for the players 
//player 1
let pX;
let pY;
let pW = 20;
let pH = 120;
//player 2
let pX0;
let pY0;
//speed of the ball
let speedB = 4;

//variables for movement of the ball in other direction 
let ballmovementX = -1;
let ballmovementY = -1;

//speed of the players 
let speedP = 6;

//variable to push back the objects in the court when trying to get out 
let mov = 50;

//variables for the score board 

let scoreP = 0;
let scoreP0 = 0; 

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

function draw(){
  pingPong();
}
function pingPong() {

  //calling functions 

    keyPushed();
    keyPressed();


    background(0);

    //dotted line in the center


    noFill()
    stroke('#fafbfc');
    strokeWeight(3);
    setLineDash([15,15]);
    line(600,0,600,height);

    //ball 


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

    //speed of the ball 

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
        bX = width/2;// ball coming back to the origin restarting the game 
        bY = height/2;
        //bX= bX+mov;
        scoreP0 = scoreP0 + 1; //player 2 scores 
      }

      if(bX >=width){
        bX = width/2;
        bY= height/2
        scoreP = scoreP + 1; // player 1 scores 
      }

      if(scoreP0>=10){ //the one who scores 10 first wins the game 

        textAlign(CENTER);
        textSize(50);
        fill('#60f789');
        text('Player 2 Wins!' , width/2, height/2);
        noLoop();

      }

      else if(scoreP>=10){
        textAlign(CENTER);
        textSize(50);
        fill('#60f789');
        text('Player 1 Wins!', width/2, height/2);
        noLoop();
      }

      //the collision of the ball with the sliders or the rectangles 
    
      if(bX>= pX-10 && bX <= pX+10 && bY>= pY-60 && bY<= pY+60){
        ballmovementX = ballmovementX*-1;
      }

      else if(bX>= pX0-10 && bX <= pX0+10 && bY>= pY0-60 && bY<= pY0+60){
        ballmovementX = ballmovementX*-1;
      }

      //Score Player 1(left)

      textSize(20);
      text(scoreP,300,30);
      

      //Score player 2(right)
      text(scoreP0,900,30);
      fill(255);


      // ball hits left wall

    
}
//use of w and s keys to move the left rectangangle 
function keyPushed(){
    if(key=='w' && keyIsPressed){
        pY= pY-speedP;
    }

    else if(key=='s' && keyIsPressed){
        pY= pY+speedP;
    }
}

//use of up and down key to move the right rectangle 
function keyPressed(){
    if(keyCode == UP_ARROW && keyIsPressed){
        pY0 = pY0-speedP;
    }

    else if (keyCode == DOWN_ARROW && keyIsPressed){
        pY0 = pY0+speedP;
    }
}

//dash lines in the middle of the playing court 
function setLineDash(list) {
    drawingContext.setLineDash(list);
  }

