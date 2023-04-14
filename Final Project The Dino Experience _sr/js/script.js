/**
Final Project, The Dino Experience 
Negar and Mollika 
Description: 
**/

//////Global Variables 
let backgroundColor;

let ellipseY;

let bgColorChanged = false;

let gameState = 0;

let img;
let space;
let instructions;
let astsmall;

let shooting = false;
let xpos, ypos;

///parallax background variables
let bgImg;
let x1 = 0;
let x2;

let scrollSpeed = 2;

/// declaring character 
let selectedCharacter =null; 



let character1, character2, character3;

//NEW player
let playerTwo ;
//for shooting
let lasers = [];


//initial health value
let health = 100;
let healthColor;
let player2ast;

let p1score = 0;
let p2score = 0;

dinoWins = false;
astWins = false;

let bgMusic ;
let marsImage;

////Preload 

//source of the gif: https://cutewallpaper.org/24x/0jzc6x1vk/2895526449.jpg



function preload() {
img= loadImage('assets/images/dino landing page.png');
dino = loadImage('assets/images/dino4.gif');
space = loadImage('assets/images/space.jpeg');
instructions =loadImage('assets/images/dino instructions page.png')
bgImg = loadImage('assets/images/parallax_bg1.jpeg');
astsmall = loadImage('assets/images/small_ast_red.png');
player2ast = loadImage('assets/images/fireball_ast.gif');
bgMusic = loadSound('assets/sounds/bgmusic.mp3');
marsImage = loadImage('assets/images/Mars.png');
}

///Class Mars 

class Planet {
  constructor(x, y) {
    this.x = 1400;
    this.y = 900;
    this.angle = 0;
    this.image = marsImage;
    this.w = 200; // width of the planet
    this.h = 200; // height of the planet
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.w, this.h);
    pop();
  }

  update() {
    this.angle += 0.01; // adjust rotation speed as needed
  }
}

//////class characters 
//FIX DINOS
class Character {
  constructor(name, health, attack, defense, image,x,y) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.image = image;
    this.x = x;
    this.y =y;
    this.w = 500;
    this.h = 500;
    this.jumping = false;
    this.velocity =0;
    this.isFalling =false;
  }

  display() {
    push();
    // Draw character image
    image(this.image, this.x, this.y, this.w, this.h);

    // Draw character name
    textSize(40);
    textAlign(RIGHT, TOP);
    text(this.name, this.x+this.w/2, this.y + this.h+50);

    // Draw character health, attack, and defense
    textSize(14);
    textAlign(LEFT);
    pop();
  
  }

  //new ... 
  displayOnlyDino(){
    push();
    // Draw character image
    image(this.image, this.x, this.y, this.w, this.h);
    pop();
  }

  //new update
  update(){

   //test for dino on top of mars 
   let distance = dist(this.x + this.w / 2, this.y + this.h / 2, mars.x, mars.y);
  if (distance < (this.w + mars.w) / 2) {
    dinoWins = true;
  }



   // test ends 
  
   if (this.jumping) {
    
      // going up
      this.velocity = -25;
      this.jumping = false;
      this.isFalling =true;

      
    }
    
    else if( this.isFalling) {

      // speed that its going down
    this.velocity += 0.5;
    console.log(this.velocity)
    this.y += this.velocity; 
    this.x+= 2;

    if(this.y > height - this.h){
      console.log("still");
      this.y = height - this.h;
     // this.velocity *= -0.1;
     this.velocity =0;
     this.isFalling =false;
    }
  }

    if (this.x >= width) {

    this.isFalling = false
    this.jumping = false   
    console.log("dino wins")
    dinoWins = true;
   
    }

  if (dinoWins) {
    // Stop movement when dino wins
    this.velocity = 0;
    this.jumping = false;
    this.isFalling = false;
    this.x += 0;
    this.y = mars.y - this.h - 30;
  }

 
  

  }
  
 /* edges() {
    if (this.x >= width) {
    this.x -= 10
    this.jumping = false   
    console.log("dino wins")
    text("dino wins");
    } 

  } */


   /* edges() {
    if (this.x > width + this.r) {
      this.x = -this.r;
    } else if (this.x < -this.r) {
      this.x = width + this.r;
    }
    if (this.y > height + this.r) {
      this.y = -this.r;
    } else if (this.y < -this.r) {
      this.y = height + this.r;
    } 
  } */

}
let mars;
//// Setup 

function setup() {

  mars = new Planet(width / 2, height / 2);
  player2ast.resize(150,150);
  createCanvas(1500,1000);



  //for the parallax background 

  x2 = width; 

// for the characters 
  character1 = new Character("Lofty", 100, 20, 10, loadImage("assets/images/Dino_1_Lofty.png"),10,100);
  character2 = new Character("Blossoms", 120, 18, 12, loadImage("assets/images/dino_2_blossoms.png"),450,100);
  character3 = new Character("Tickles", 80, 22, 8, loadImage("assets/images/dino_3_tickles.png"),1000,100);

  // asteroid1 = new Laser("astsmall", 100, 20, 10, loadImage('assets/images/small_ast_red.png'), 10, 100);
  // asteroid2 = new Laser("astsmall", 100, 20, 10, loadImage('assets/images/small_ast_red.png'), 10, 100);
  // asteroid3 = new Laser("astsmall", 100, 20, 10, loadImage('assets/images/small_ast_red.png'), 10, 100);

  rectMode(CENTER);
  textAlign(CENTER);

  // variables for the position of astroids
  xpos = 200;
  ypos = 200;
  dx = 2;
  dy = 0;
  

  if (annyang) {
    console.log("here")
    // Let's define a command.
    const commands = {
     // 'hello': () => { alert('Hello world!'); }
     'jump':()=>{ updateDino() },
     'bounce':()=>{ updateDino() },
    // 'double jump':()=>{ updateDinoDouble() },
     'green':()=>{ changeBackground('green') },
     'blue':()=>{ changeBackground('blue') },
     'pink':()=>{ changeBackground('pink') },
     'purple':()=>{ changeBackground('purple') }
    };
  
    // Add our commands to annyang
    annyang.addCommands(commands);
  
    // Start listening.
    annyang.start();
    //annyang.debug()
  }


//init player
playerTwo  = new PlayerTwo();

//background music playing 
bgSong();
 

} /// end setup 

function bgSong(){

  bgMusic.play();
  bgMusic.loop();
  userStartAudio();
}


annyang.addCallback('soundstart', function() {
  console.log('sound detected');
});

annyang.addCallback('result', function() {
  console.log('sound stopped');
});
//FOR THE JUMP, IN THE VELOCITY, AFFEct the health, health related stuff will take place here. 
function updateDino(){

  console.log (gameState)
  //console.log("jump");
  //annyang.abort();
 // annyang.resume();
  if(gameState ===3 ){
    console.log("jump");
    

     selectedCharacter.jumping = true;
     selectedCharacter.velocity = -10;
    bgColorChanged = false;

  }
  }


 /* function updateDinoDouble(){

    if(gameState ===3){
      console.log("herr  double- "+ gameState)
  
    }
    } */
  

  function changeBackground(color){
    console.log(color)

  }

////// draw 

function draw() {

  background(0);

  if (gameState === 0) {
    startPage();

  } else if(gameState === 1){
    instructionPage();

  } else if(gameState === 2){
    characterPage();

  } else if(gameState === 3){
    playPage();
    bgMusic.pause();
  }
    
}

function startPage() {

  //console.log("gamestate ==0")

  background(0);
  image(img, 0, 0, width, height);
  fill(162, 255, 0)
  rect(1300, 900, 200, 100, 10);
  textSize(50)
  fill("white");
  text("START", 1300, 915);

}

function instructionPage() {
 // console.log("gamestate ==1")
  background(0);
  image(instructions,0,0,width,height);
  fill(162, 255, 0)
  rect(1300, 100, 200, 100, 10);
  textSize(50)
 
  fill("white");
  text("NEXT", 1300, 120);

  fill(162, 255, 0)
  rect(200, 100, 200, 100, 10);
  textSize(50)
  fill("white");
  text("BACK", 200, 120);

}

function characterPage() {
  //console.log("gamestate ==2")
  background(0);
  image(space, 0, 0, width, height);
  
  fill(162, 255, 0)
  rect(200, 100, 200, 100, 10);
  textSize(50)
  fill("white");
 // textAlign(CENTER)
  text("BACK", 200,120);

  /*stroke(51);
  noFill()
  rect(250, 350, 200, 320);
  rect(700, 350, 200, 320);
  rect(1100, 350, 200, 320); */

  character1.display(); // Display character1 at (200, 300)
  character2.display(); // Display character2 at (500, 300)
  character3.display(); // Display character3 at (800, 300)

 

  //PUT from gamestate 3 to 2:

  //ISSUE:: you are constantly resetting the character here ... you need to go into this sequence ONE time only
  if (selectedCharacter!==null) {

    // //console.log(selectedCharacter)
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

//this is my draw, we update dino, lasers,player two everything the way they look, scores will too be here, if the
//laser hits the dino the player 2 score goes up
function playPage() {
  
 // console.log("gamestate ==3")

//parallax background constant scrolling effect {reference: https://editor.p5js.org/chjno/sketches/ByZlypKWM}
 
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

  fill("white");
  textSize(25);
  text("dino: " +p1score, 1150, 100);
  text("asteroid: " +p2score, 1300, 100);
  
//back button to change character selection depending on the user choices 
  fill(162, 255, 0)
  rect(200, 100, 200, 100, 10);
  textSize(50)
  fill("white");
  //textAlign(CENTER)
  text("BACK", 200, 120);


  // Draw the object
  //ellipse(xpos + 1200, ypos, 50, 50);
  selectedCharacter.displayOnlyDino();
  //call update
  selectedCharacter.update();

  playerTwo.display();
  playerTwo.turn();
  playerTwo.update();
  
 // character1.edges();
 // character2.edges();
 // character3.edges();

if (dinoWins === true) {
  textSize(100);
  fill('white');
  text("dino wins!", 750, 500);
}

if (astWins === true) {
  textSize(100);
  fill('white');
  text("asteroid wins!", 750, 500);
}

//collision happens, 
  for (let i = lasers.length-1; i >= 0; i--) {
    lasers[i].display();
  	lasers[i].update();
    //din't hit dino, dino doged it 
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
      p1score = p1score + 1;
      //dino got hit

    } else {
    		if (lasers[i].hits(selectedCharacter)) {
    	    lasers.splice(i, 1);
          console.log("hit the dino")
          selectedCharacter.x -= 10
            health -= 5; // Decrease health by 10
            if (health < 0) {
              health = 0; // Clamp health value to minimum of 0
              astWins = true;
            }
            p2score = p2score + 1;
    	    break;
    		}
    	}
  }
  
  //console.log(lasers.length);

// health bar 


// Calculate health bar width based on current health value
let healthBarWidth = map(health, 0, 100, 0, 300);

//let healthColor = lerpColor(color(0, 255, 0), color(255, 0, 0), health / 100);

if (health > 50) {
  fill(0, 255, 0); // Green color
} else {
  fill(255, 0, 0); // Red color
}

push();
rectMode(CENTER);
noFill();
strokeWeight(4);
stroke(255);
rect(750, 50, 300, 20)
pop(); 

let healthBarX = width/2 + healthBarWidth/2 ;

/*if (health == 0) {
 dino lost. aestroid won.
} */

// Draw health bar anchored on left side


noStroke();
// Draw health bar
//fill(healthColor);

rectMode(CENTER);
rect(healthBarX - 150, 50, healthBarWidth, 20);

mars.display();
  mars.update();

} // play page ends 



//CHANGED
function mousePressed() {
  if (gameState == 0 && mouseX >= 900 && mouseX <= 1300 && mouseY >= 850 && mouseY <= 950 && mouseIsPressed) {
    gameState++;
  } else if (gameState == 1 && mouseX >= 1200 && mouseX <= 1400 && mouseY >= 50 && mouseY <= 150 && mouseIsPressed) {
    gameState++;
  } else if (gameState == 2 && mouseX >= 150 && mouseX <= 350 && mouseY >= 190 && mouseY <= 510 && mouseIsPressed) {
   // gameState++;
   // selectedCharacter = loadImage('assets/images/dino_1_Lofty.png'); // Load the selected character image
   selectedCharacter =new Character("Lofty", 100, 20, 10, loadImage("assets/images/Dino_1_Lofty.png"),10,100);
  } else if (gameState == 2 && mouseX >= 600 && mouseX <= 800 && mouseY >= 190 && mouseY <= 510 && mouseIsPressed) {
    //gameState++;
    //selectedCharacter = loadImage('assets/images/dino_2_blossoms.png'); // Load the selected character image
    selectedCharacter =new Character("Blossoms", 120, 18, 12, loadImage("assets/images/dino_2_blossoms.png"),450,100);
  } else if (gameState == 2 && mouseX >= 1000 && mouseX <= 1500 && mouseY >= 190 && mouseY <= 510 && mouseIsPressed) {
    selectedCharacter  = new Character("Tickles", 80, 22, 8, loadImage("assets/images/dino_3_tickles.png"),1000,100);
    //gameState++;
   // selectedCharacter = loadImage('assets/images/dino_3_tickles.png'); // Load the selected character image
  } else if (mouseX >= 100 && mouseX <= 300 && mouseY >= 50 && mouseY <= 150 && mouseIsPressed) {
    if(gameState ===3){
      console.log("here");
      selectedCharacter =null;
    }
    gameState--;
    //check if we are going back to gameState ===2 -> then we need to set selectedChar to null
   
    
  }
 
} 

let laserCounter = 0;

function keyPressed() {
  if (key == ' ') {
    
     laserCounter++;
    // push a new laser object every other time
    if (laserCounter % 2 == 0) {
      lasers.push(new Laser(playerTwo.pos, playerTwo.heading));
    }
      	

	} else if (keyCode == RIGHT_ARROW) {
    playerTwo.setRotation(0.05);
  } else if (keyCode == LEFT_ARROW) {
    playerTwo.setRotation(-0.05);
  } /*else if (keyCode == UP_ARROW) {
    playerTwo.boosting(true);
  }*/
}


function keyReleased() {
  playerTwo.setRotation(0);
  playerTwo.boosting(false);
}

 //https://editor.p5js.org/simontiger/sketches/r16tcHq3e
class PlayerTwo{
  constructor(){
  this.pos = createVector(width/2, height/2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;
  }
  
  boosting(b) {
    this.isBoosting = b;
  }
  
  update() {
    if (this.isBoosting) {
    	this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }
  
  boost() {
   let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  
      hits (dino) {
      var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
      if (d < this.r + asteroid.r) {
        return true;
      } else {
        return false;
      }
    }
  
   display() {
    push();
    //rectMode(CENTER);
    translate(this.pos.x+75, this.pos.y+75);
    rotate(this.heading);
    fill(0);
    stroke(255);

   // triangle(-this.r, this.r, this.r, this.r, 0, -this.r);

    //fill(255);
    //rect(0,0,150,150)
     image(player2ast,-80,-80,130,130);
    //fill(255,0,0);
    //ellipse(0,0,50,50);
    pop();
  }
  

  
  setRotation(a) {
    this.rotation = a;
  }
  
  turn () {
    this.heading += this.rotation;
  }
}
  


class Laser{

  constructor (spos, angle) {
    //this.image = image;
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(5);
    this.w = 100;
    this.h = 100;
    
  }
    
   update () {
      this.pos.add(this.vel);
    }
    display () {
      push();
      stroke(255);
      strokeWeight(4); 
     // point(this.pos.x, this.pos.y);
       image(astsmall, this.pos.x, this.pos.y, this.w, this.h);
      pop();
      //image(this.image, this.pos.x, this.pos.y, 10, 10);
     // 
    }

    
   hits(dino) {
      let d = dist(this.pos.x, this.pos.y, dino.x, dino.y);
      if (d < dino.w/2) {
          
        return true;
      } else {
        return false;
         
      }
    }
    
  offscreen() {
      if (this.pos.x > width || this.pos.x < 0) {
        return true;
      }
      if (this.pos.y > height || this.pos.y < 0) {
        return true;
      }
      return false;
    }
  }
/// health function 
  
  

// why is it jumping only twice
// how to make it jump ahead

// idea 1: dino is jumping ahead while the asteroid has to hit it 50 times before it reaches the end of the screen
// making for a short but intense game
// idea 2: dino is moving to the right/ jumping on the steps, but everytime it is hit by the asteroid it moves or goes back a step goal: to reach the end of the screen
// idea 3: dino stays where it is


// to do: dino loses create edges
// duck or the 3rd word