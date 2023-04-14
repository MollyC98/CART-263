/**
CART 263 Final Project: A Playful Interaction 

Title: The Dino Experience 

Authors: Negar Roofigariesfahani and Mollika Chakraborty

Description: This project explores an imaginative world for a little Dinosaur 
who has been exint from earth but now is set to travel to other nearest planet Mars. With the 
use of the speech library Annyang we have given an different style to the game playing experience 
in a hope that the players would have fun to interact with it. The game requires 2 players within the 
same environment. 
**/

/*About Readme files: README_FINAL is the readme file for the complete project and README_PLAYTEST is 
//the earlier version. */

//////Global Variables 

//Gamestate variable is the declaration for the different pages of the game.
let gameState = 0;

//The landing page image designed in photoshop 
let img;
//The instruction page image designed in photoshop
let instructions;
//The character page image
//Source: https://stock.adobe.com/ca/search/images?filters%5Bcontent_type%3Aphoto%5D=1&filters%5Bcontent_type%3Aillustration%5D=1&filters%5Bcontent_type%3Azip_vector%5D=1&filters%5Bcontent_type%3Aimage%5D=1&order=relevance&price%5B%24%5D=1&safe_search=1&k=space+vector&search_page=1&search_type=usertyped&acp=&aco=space+vector&get_facets=0&asset_id=289726988
let space;


//The asteroid image used for the Laser class designed in photoshop 
let asteroid;
//The fireball image used for the PlayerTwo class designed in Adobe AfterEffects 
let fireball;
//The mars image, Source: https://www.pngwing.com/en/free-png-zlgxv
let marsImage;
//The heart image,Source: https://pngtree.com/freepng/smooth-glossy-heart-vector-file-ai-and-png_7683158.html
let heartImage;

//Declaring the health variable and setting it to 100
let health = 100;

//Asteroid shooting
let shooting = false;

///Parallax background variables
let bgImg;
let x1 = 0;
let x2;
let scrollSpeed = 2;

///Declaring the selected character variable, which is at first null
let selectedCharacter =null; 

//3 different dino characters for class PlayerOne
let character1, character2, character3;

//Mars for class Planet
let mars;

//Array of shooting asteroids for class Laser
let lasers = [];
let laserCounter = 0;

//Declaring scores variable for player 1 and 2 and setting it to 0
let p1score = 0;
let p2score = 0;

//Booleans for the game results
dinoWins = false;
astWins = false;

//Music 
//Source:https://youtu.be/vX1xq4Ud2z8
let bgMusic ;
//Source: Quick jump arcade game https://mixkit.co/free-sound-effects/game/?page=2
let jumpSound;
//Source: Hurt (Retro video game SFX) https://freesound.org/people/cabled_mess/sounds/350924/
let crySound;


////Preload 

//Preloading the assests
function preload() {
  img= loadImage('assets/images/dino landing page.png');
  dino = loadImage('assets/images/dino4.gif');
  space = loadImage('assets/images/space.jpeg');
  instructions =loadImage('assets/images/dino instructions page.png')
  bgImg = loadImage('assets/images/parallax_bg1.jpeg');
  asteroid = loadImage('assets/images/small_ast_red.png');
  fireball = loadImage('assets/images/fireball_ast.gif');
  marsImage = loadImage('assets/images/Mars.png');
  heartImage = loadImage('assets/images/heart.png');

  bgMusic = loadSound('assets/sounds/bgmusic.mp3');
  jumpSound = loadSound('assets/sounds/jump.mp3');
  crySound = loadSound('assets/sounds/cry2.wav');
} /// Preload ends 

//// Setup 

function setup() {

  //object mars with position at the middle of the canvas 
  mars = new Planet(width / 2, height / 2);

  //object fireball resize parameters 
  fireball.resize(150,150);

  //canvas 
  createCanvas(1500,1000);

  //for the parallax background 
  x2 = width; 

  //3 characters for class PlayerOne: Lofty at (10, 200), Blossoms at (500, 200), Tickles at (1000, 200)
  character1 = new PlayerOne("Lofty", loadImage("assets/images/Dino_1_Lofty.png"),10,200);
  character2 = new PlayerOne("Blossoms", loadImage("assets/images/dino_2_blossoms.png"),500,200);
  character3 = new PlayerOne("Tickles", loadImage("assets/images/dino_3_tickles.png"),1000,200);
  // alignment of text and image
  rectMode(CENTER);
  textAlign(CENTER);
  // Annyang speech recognition library, Source: cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js 
  if (annyang) {
    // let's define our commands.
    const commands = {
     'jump':()=>{ updateDino() },
     'bounce':()=>{ updateDino() },
    };
  
    // add our commands to annyang
    annyang.addCommands(commands);
    // start listening.
    annyang.start();
   
  }


 //init player
 playerTwo  = new PlayerTwo();

 //background music playing 
 bgSong();
 
} /// end setup 


function updateDino(){
  if(gameState ===3 ){
    selectedCharacter.jumping = true;
    selectedCharacter.velocity = -10;
  } 
}

/// annyang speech library callback functions to be triggered during different instances of speech recognition in the game 
annyang.addCallback('soundstart', function() {
  console.log('sound detected');
});

annyang.addCallback('result', function() {
  console.log('sound stopped');
});


///Class for player 1 (dino)
class PlayerOne {
  constructor(name,image,x,y) {
    this.name = name;
    this.image = image;
    this.x = x;
    this.y =y;
    
    this.w = 500;
    this.h = 500;
    this.jumping = false;
    this.isFalling =false;
    this.velocity =0;
  }

  //declaring function display 
  display() {
    
    /* This line calls the push() function, which saves the current drawing settings 
    (such as transformations, styles, etc.) to a stack. This is typically done to isolate 
    transformations or styles applied within a specific block of code.
    */
    push();
    // draw character image 
    image(this.image, this.x, this.y, this.w, this.h);
    // draw character name
    textSize(40);
    textAlign(RIGHT, TOP);
    text(this.name, this.x+this.w/2+70, this.y + this.h+50);
    //for the text in the back buttion in the character page 
    textSize(14);
    textAlign(LEFT);
    
    pop();
  
  }

  // for displaying one character on the play page as per user's selection of a character 
  displayOnlyDino(){
    // draw character image
    push();
    image(this.image, this.x, this.y, this.w, this.h);
    pop();
  }

  // updating the settings for the dino (PlayerOne)
  update(){

    //test for dino on top of mars, if it matches the given settings Dino wins 
    let distance = dist(this.x + this.w / 2, this.y + this.h / 2, mars.x, mars.y);
    if (distance <= (this.w + mars.w) / 2) {
      dinoWins = true;
    }// test ends 

    /*This block of code checks if the character is currently jumping (this.jumping is true). 
    If it is, it plays a jump sound (jumpSound.play()), sets the character's vertical velocity to 
    -25 (this.velocity = -25), and sets this.jumping to false and this.isFalling to true.
    */
   if (this.jumping) {
      // going up
      jumpSound.play();
      this.velocity = -25;
      this.jumping = false;
      this.isFalling =true;

    } 

    /*This block of code checks if the character is currently falling (this.isFalling is true). If it is, 
    it increases the character's vertical velocity by 0.5 (this.velocity += 0.5), updates the character's 
    position along the y-axis based on its velocity (this.y += this.velocity), and updates the character's 
    position along the x-axis by adding 2 to its current x-coordinate (this.x += 2). It also checks if the 
    character has landed on the ground (y-coordinate greater than height minus character's height), and if 
    so, it sets the character's y-coordinate to the height minus the character's height, sets the velocity to 0, and sets this.isFalling to false.
    */
    
    else if( this.isFalling) {

      // speed that its going down
      this.velocity += 0.5;
      console.log(this.velocity)
      this.y += this.velocity; 
      this.x+= 2;

      if(this.y > height - this.h){
        console.log("still");
        this.y = height - this.h;
        this.velocity =0;
        this.isFalling =false;
      }
    }
  /*
  This block of code checks if the character has reached the right edge of the canvas (x-coordinate greater 
  than or equal to width). If it has, it sets this.isFalling and this.jumping to false, logs "dino wins" to 
  the console, and sets dinoWins to true.
  */
    if (this.x >= width) {
      this.isFalling = false
      this.jumping = false   
      console.log("dino wins")
      dinoWins = true;
  
    }

    /*
    This block of code checks if dinoWins is true, which indicates that the character has won the game. If it 
    is, it stops the character's movement by setting the velocity to 0, sets this.jumping and this.isFalling to
    false, sets the character's x-coordinate to its current value (effectively not changing it), and sets the 
    character's y-coordinate to mars.y - this.h - 30, which is the y-coordinate of the mars object minus the 
    character's height minus 30 pixels.
    */

    if (dinoWins) {
      this.velocity = 0;
      this.jumping = false;
      this.isFalling = false;
      this.x += 0;
      this.y = mars.y - this.h - 30;
    }
    
    /*
    This block of code checks if astWins is true, which indicates that the opposing player has won the game. 
    If it is, it stops the character's movement by setting the velocity to 0, 
     */
    if (astWins) {
      this.velocity = 0;
      this.jumping = false;
      this.isFalling = false;

    }
  }
}

// tutorial for laser shooter {reference: https://editor.p5js.org/simontiger/sketches/r16tcHq3e}
class PlayerTwo{
  constructor(){

    //Player's initial position 
    this.pos = createVector(width/2, height/2);

    //Player's radius
    this.r = 20;

    //Player's initial heading angle 
    this.heading = 0;

    //Player's rotation angle 
    this.rotation = 0;

    //Player's velocity
    this.vel = createVector(0, 0);
    
    //Player's boost status 
    this.isBoosting = false;
  }
  //setting the boost status 
  boosting(b) {
    this.isBoosting = b;
  }
  //apply boost if the player is boosting 
  update() {
    if (this.isBoosting) {
    	this.boost();
    }

    //update player's position base don velocity 
    this.pos.add(this.vel);
    
    //apply friction to the velocity 
    this.vel.mult(0.99);
  }
  
  boost() {
    // create a vector from player's heading
    let force = p5.Vector.fromAngle(this.heading);
    // scale the vector to control boost strength
    force.mult(0.1);
    // add the boost force to player's velocity
    this.vel.add(force);
  }
  
  display() {
    /* using push and pop since (0, 0) is being translated to the deviated position of the PlayerTwo
    This ensures that the object is drawn centered at its position rather than at its top-left corner. furthurmore,
    rotate the coordinate system by an angle equal to the current heading of the object so that the object is drawn facing in the direction it is moving.
    lastly, display the fireball image relative to the current origin */
    push();
    translate(this.pos.x+75, this.pos.y+75);
    rotate(this.heading);
    fill(0);
    stroke(255);
    image(fireball,-80,-80,130,130);
    pop();
  }
  // set rotation fucntion
  setRotation(a) {
    this.rotation = a;
  }
  // set turning function that increases the heading by value of its rotation
  turn () {
    this.heading += this.rotation;
  }
}

class Laser {
  constructor (spos, angle) {
    // the laser's initial position
    this.pos = createVector(spos.x, spos.y);
    // creates a velocity vector from an angle
    this.vel = p5.Vector.fromAngle(angle);
    // multiply the length of velocity vecter, therefore increasing the speed
    this.vel.mult(5);
    // width of laser
    this.w = 100;
    // height of laser
    this.h = 100;
    
  }

  // add the velocity vector to the (x,y) position 
  update () {
    this.pos.add(this.vel);
  }
  // display the scaled image of the aestroid at each position 
  display () {
    push();
    stroke(255);
    strokeWeight(4); 
    image(asteroid, this.pos.x, this.pos.y, this.w, this.h);
    pop();
   
  }
  
  hits(dino) {
    /* calculate the distance between dino (PlayerOne) and asteroids (Laser) if the distance is less than
    half the width of dino, then dino has been hit by the asteroid, otherwise return false  */
    let d = dist(this.pos.x, this.pos.y, dino.x, dino.y);
    if (d < dino.w/2) {
      return true;
    } else {
      return false;
    }
  }
    
  offscreen() {
    /* if the x-coordinate of the object's position is greater than the width of the canvas or less than 0 (the left edge of the canvas)
    then the object is offscreen horizontally and the method returns true */
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    /*if the y-coordinate of the object's position is greater than the height of the canvas or less than 0 (the top edge of the canvas)
    then the object is offscreen vertically and the method returns true*/
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    /* if neither of the above conditions is true, then the object is still onscreen and the method returns false. */
    return false;
  }
 
}
///Class for Mars 
class Planet {
  constructor(x, y) {
    // positioned at (1400, 900)
    this.x = 1400;
    this.y = 900;
    this.angle = 0; // starting from angle 0
    this.w = 200; // width of the planet
    this.h = 200; // height of the planet
  }

  display() {
    // display the mars image at the translated origin of its x and y position and then rotate it by the angle
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(marsImage, 0, 0, this.w, this.h);
    pop();
  }

  update() {
    this.angle += 0.01; // increase the rotation angle
  }
}

// draw fucntion
function draw() {
  
  background(0); // black background
  // if gameState = 0, go to the startPage function
  if (gameState === 0) {
    startPage();
   // if gameState = 1, go to the instructionPage function
  } else if(gameState === 1){
    instructionPage();
   // if gameState = 2, go to the characterPage function
  } else if(gameState === 2){
    characterPage();
   // if gameState = 3, go to the playPage function and stop the intro music
  } else if(gameState === 3){
    playPage();
    bgMusic.pause();
  }
    
}

function startPage() {

  // startPage image
  image(img, 0, 0, width, height);
  // position, text, size, and color of the START button
  fill(162, 255, 0);
  rect(1300, 900, 200, 100, 10);
  noStroke();
  textSize(50);
  fill("white");
  text("START", 1300, 915);

}

function instructionPage() {

  // instructionPage image
  image(instructions,0,0,width,height);
  // position, text, size, and color of the NEXT button
  fill(162, 255, 0)
  rect(1300, 100, 200, 100, 10);
  noStroke();
  textSize(50)
  fill("white");
  text("NEXT", 1300, 120);
  // position, text, size, and color of the BACK button
  fill(162, 255, 0)
  rect(200, 100, 200, 100, 10);
  noStroke();
  textSize(50)
  fill("white");
  text("BACK", 200, 120);

}

function characterPage() {

 // characterPage image
  image(space, 0, 0, width, height);
 // position, text, size, and color of the BACK button
  fill(162, 255, 0)
  rect(200, 100, 200, 100, 10);
  noStroke();
  textSize(50)
  fill("white");
  text("BACK", 200,120);

  // display the 3 dino characters on screen
  character1.display(); 
  character2.display(); 
  character3.display(); 

  // when character is chosen, go to next game state (playPage) and display the resized version of the character at the bottom left of the screen
  if (selectedCharacter!==null) {
   selectedCharacter.w = 250; 
   selectedCharacter.h = 250; 
   selectedCharacter.x = 0;
   selectedCharacter.y = height - selectedCharacter.h ; 
   selectedCharacter.image.resize(selectedCharacter.w, selectedCharacter.h);
   selectedCharacter.displayOnlyDino();
   // go to next state
   gameState++;

  }
}

// this is where we set most of the conditions of the game (health, win, collision, score)
function playPage() {

 // parallax background constant scrolling effect {reference: https://editor.p5js.org/chjno/sketches/ByZlypKWM}

  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }

  // the scoreboard 
  fill("white");
  textSize(25);
  text("dino: " +p1score, 1150, 100);
  text("asteroid: " +p2score, 1300, 100);
  
  // position, text, size, and color of the BACK button
  fill(162, 255, 0);
  rect(200, 100, 200, 100, 10);
  noStroke();
  textSize(50);
  fill("white");
  text("BACK", 200, 120);

  // calling the fucntions in classes PlayerOne and PlayerTwo
  selectedCharacter.displayOnlyDino();
  selectedCharacter.update();
  playerTwo.display();
  playerTwo.turn();
  playerTwo.update();
  

  // if the dinoWins conditions are met, write "dino wins!" on screen
 if (dinoWins === true) {
    textSize(100);
    fill('white');
    text("dino wins!", 750, 500);
 }
  // if the astWins conditions are met, write "asteroid wins!" on screen
 if (astWins === true) {
    textSize(100);
    fill('white');
    text("asteroid wins!", 750, 500);
 }

 /* 
 the foor loop iterates through the lasers array, calling the functions to update the position and display of the laser object. 
 this block of code is responsible for checking whether a character object has been hit by a laser object or not, 
 if dino is hit add a score to the asteroid, play the cry sound effect, change the x position of dino by -20, remove the laser object, and decrease dinos health by 7
 but, if the dino doges the laser object, add a score to the dino. */
  for (let i = lasers.length-1; i >= 0; i--) {
   
    lasers[i].display();
    lasers[i].update();
    // din't hit dino, dino doged it 
    if (lasers[i].offscreen()) {
    lasers.splice(i, 1);
    p1score = p1score + 1;
    // dino got hit
    } else {
      if (lasers[i].hits(selectedCharacter)) {
        lasers.splice(i, 1);
        selectedCharacter.x -= 20
        health -= 7; // Decrease health by 10
        crySound.play();
        if (health < 0) {
          health = 0; // Clamp health value to minimum of 0
          astWins = true;
        }
        p2score = p2score + 1;
        break;
      }
    } 
  }
  
  // if health is less than 50 turn the health bar from green to red
 if (health > 50) {
  fill(0, 255, 0); // Green color
 } else {
  fill(255, 0, 0); // Red color
 }
  /* calculate health bar width based on current health value The map() function takes a value (health)
  and maps it from one range of values (0 to 100) to another range of values (0 to 300)  */
  let healthBarWidth = map(health, 0, 100, 0, 300);
  // calculate the x positon of the health bar
  let healthBarX = width/2 + healthBarWidth/2 ;
  rectMode(CENTER);
  // draw a rectangle where x: helathBarX and width: helathBarWidth and then center it accordingly */ 
  rect(healthBarX - 150, 50, healthBarWidth, 20);
  // image of a heart the left of the health bar
  image(heartImage, healthBarX-395, height/2-490,70,70);

  // the rectangle stroke outlining the health bar
  push();
  rectMode(CENTER);
  noFill();
  strokeWeight(4);
  stroke(255);
  rect(750, 50, 300, 20)
  pop(); 
 

  // display and update the mars from Planet class
  mars.display();
  mars.update();

} // play page ends 


// pressing on the mouse
function mousePressed() {

  // going forward in the game
  // if gameState = 0 (startPage) and mouse is pressed in these bounds of x and y, go to the next gameState (instructionPage) 
  if (gameState == 0 && mouseX >= 1200 && mouseX <= 1400 && mouseY >= 850 && mouseY <= 950 && mouseIsPressed) {
    gameState++;
  // if gameState = 1 (instructionPgae) and mouse is pressed in these bounds of x and y, go to the next gameState (CharacterPage)
  } else if (gameState == 1 && mouseX >= 1200 && mouseX <= 1400 && mouseY >= 50 && mouseY <= 150 && mouseIsPressed) {
    gameState++;
  // if gameState = 2 (characterPage) and mouse is pressed in these bounds of x and y, select "lofty" character
  } else if (gameState == 2 && mouseX >= 150 && mouseX <= 350 && mouseY >= 290 && mouseY <= 610 && mouseIsPressed) {
   selectedCharacter = new PlayerOne("Lofty", loadImage("assets/images/Dino_1_Lofty.png"),10,200);
  // if gameState = 2 (characterPage) and mouse is pressed in these bounds of x and y, select "Blossoms" character
  } else if (gameState == 2 && mouseX >= 650 && mouseX <= 850 && mouseY >= 290 && mouseY <= 610 && mouseIsPressed) {
   selectedCharacter = new PlayerOne("Blossoms", loadImage("assets/images/dino_2_blossoms.png"),500,200);
  // if gameState = 2 (characterPage) and mouse is pressed in these bounds of x and y, select "Tickles" character
  } else if (gameState == 2 && mouseX >= 1000 && mouseX <= 1500 && mouseY >= 290 && mouseY <= 610 && mouseIsPressed) {
   selectedCharacter = new PlayerOne("Tickles", loadImage("assets/images/dino_3_tickles.png"),1000,200);
  // if mouse is pressed in these bounds of x and y, go to the previous gameState

  //going backward in the game
  } else if (mouseX >= 100 && mouseX <= 300 && mouseY >= 50 && mouseY <= 150 && mouseIsPressed) {
    // check if we are going back to gameState = 2, then we need to set selectedCharacter to null
    if(gameState ===3){
      selectedCharacter =null;
    }
    gameState--;
  }
} // Mouse Pressed ends 

// pressing on the keys
function keyPressed() {
  // when space bar pressed 
  if (key == ' ') {
    
     laserCounter++;  // increments the laserCounter variable by 1.
    // push a new laser object at the position and heading of the playerTwo every other time
    if (laserCounter % 2 == 0) {
      lasers.push(new Laser(playerTwo.pos, playerTwo.heading));
    }
      	
  // when right arrowkey is pressed rotate playerTwo by 0.05 radians
	} else if (keyCode == RIGHT_ARROW) {
    playerTwo.setRotation(0.05);
  // when left arrowkey is pressed rotate playerTwo by -0.05 radians
  } else if (keyCode == LEFT_ARROW) {
    playerTwo.setRotation(-0.05);
  } /*  else if (keyCode == UP_ARROW) {
    playerTwo.boosting(true);
  } */
} // Key pressed ends 

// releasing the keys
function keyReleased() {
  // stop rotating and boosting
  playerTwo.setRotation(0);
  playerTwo.boosting(false);
}

// background music
function bgSong(){
  bgMusic.play(); // play the song
  bgMusic.setVolume(0.02); // lower the volume
  bgMusic.loop(); // loop the song
  userStartAudio();
}








  
  