/**
Particles with Personalities 
Mollika Chakraborty 

This code has been done with the help of p5.js reference page 
to help with the unknown syntax of some of the challenges within the code. 
*/
//Empty array for the storage of particles 
let particles = [];
//variable set at 0 to later control the hue values of the background 
let angle = 0; 
//variable to set the average frequency from the sound file 
let average=0;
//variable declaration for the sound in the code 
let sound;
// variable declaration to define Fast Fourier Transform 
let FFT;
//variable to control the rate in whih particles are created 
let counter =20;
//to detemine the bouncing of particles off the edges of the canvas 
let bounce=false;
//to deterine the rate in which the background colors would flicker in relevance to the frequency 
let colorBounce = 0.02
//randomness in the direction of the particles 
let jump=false;
//to mark the start of the animation 
let start=false;
// function preload to load the soundfile 
function preload(){
sound = loadSound('../assets/sounds/cart 263 project 1 audio .mp3');
  
}
//To set the size of the canvas to window's height and width 
function setup() {
  createCanvas(windowWidth, windowHeight);
 //initialization of Fast Fourier Transform to analyze the frequency of the uploaded sound file in the code and the volume is set to 0.2
  FFT = new p5.FFT();
  sound.amp(0.2);
}

function draw() {
  //to reset the whole code and playback from the start as a loop as soon as it marks the end of the sound file
  if(start===true){
  if(sound.isPlaying()===false){
    counter=20;
    bounce=false;
    jump=false;
    colorBounce =0.02
    sound.play()
    particles=[];
    //console lof to check the timing of when the sound stops playing 
    console.log('soundstopped');
    
  }
  //if the sound is playing then the average frequency is calculated with FFT analyze.
  else { let spectrum = FFT.analyze();
  noStroke();

  //sum as a variable to store the sum of the values of the spectrum array. 

  let sum = 0;
  //for loop to add the elements in the array with the sum 
  for (let i = 0; i < spectrum.length; i++) {
    /* let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);*/
    sum += spectrum[i];
  }
  //average of the spectrum value is calculated by dividing the sum of values with the length of the spectrum.
  average = sum / spectrum.length;
  //if the average resulted is greater than 70 as analysed by FFT then the background starts changing hues more dynamically increasing the speed of the change.
  if(average>=70){
    colorBounce=0.09
    //jump becomes true to make randomness or madness in the change in direction of the particles. 
    jump=true;
  }
  //if the average analysed in less than or equal to 60 which is less then 70 then the change of color in the background gets slower 
  else if(average>=60){
    colorBounce=0.04
    counter=5;
    //bounce becomes true as particles were dissapearing first but now are bouncing off the edge of the canvas 
    bounce=true;
    //console.log('party');
  }
  
  //the colorBounce here determines the changes in the hues of the background which is in the form of a sine wave 
   angle += colorBounce;
   // the sine angle is then mapped from -1 to 1 to 0 to 240 giving the colors we see in the background
  let mappedAngle = map(sin(angle), -1, 1, 0,240);
  //that with brightness and saturation values of 100 creates the dynamic background.
  let c = color(mappedAngle, 100, 100);

  noStroke();
  colorMode(HSB);
  //background is set to c which is the avove explained variable for the animated background 
  background(c);


  // Creating new particles, if framecount is divided by counter then new particle is pushed in the array 
  if (frameCount % counter == 0) {
    let particle = new Particle();
    particles.push(particle);
  }

  // Display and update existing particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.display();
    particle.update();

    // Remove particles that have reached their maximum lifespan
    if (particle.lifespan <= 0) {
      particles.splice(i, 1);
    }
  }
}
}
}
//class particle defining the properties of the particle objects
class Particle {
  constructor() {
    //particles getting created from middle 
    this.x = width / 2;
    this.y = height / 2;
    //velocity of the particles initially 
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    //lietime of the particles 
    this.lifespan = random(400, 500);
    //size of the particles 
    this.size = random(5,30);
    //color of the particles
    this.color = color(random(255), random(255), random(255));
    //the 3 types of existing particles tht can be randomly selected to be generated 
    this.shape = floor(random(3));
    
    
  }
   move() {
     //directional and velocity changes mapping the average frequency of the sound 
     if(jump===true){
       let tempX= map(average, 70, 100, 1,5);
       
       let tempY= map(average,70,100,1,5);
       this.vx+= random(-tempX,tempX);
       this.vy+=random(-tempY,tempY);
     }
  this.x += this.vx;
  this.y += this.vy;
  if(bounce===true){
  // Check if the particle hits the edges of the canvas
  if (this.x - this.size / 2 <= 0 || this.x + this.size / 2 >= width) {
    this.vx *= -1;
  }
  if (this.y - this.size / 2 <= 0 || this.y + this.size / 2 >= height) {
    this.vy *= -1;
  }
}
   }
   //display of the particles, initially with no fill 
  display() {
    if(bounce===false){
   noFill();
    }
    //but if bounce is true then the particles are filled with colors same as their strokes 
    else{
      fill(this.color);
    }
    stroke(this.color);

    // Draw the selected shape
    switch (this.shape) {
      case 0:
        // Draw the star shape
        let angle = TWO_PI / 5;
        beginShape();
        for (let i = 0; i < TWO_PI; i += angle) {
          let x1 = this.x + cos(i) * this.size;
          let y1 = this.y + sin(i) * this.size;
          let x2 = this.x + cos(i + angle / 2) * this.size / 2;
          let y2 = this.y + sin(i + angle / 2) * this.size / 2;
          vertex(x1, y1);
          vertex(x2, y2);
        }
        endShape(CLOSE);
        break;

      case 1:
        // Draw the triangle shape
        beginShape();
        vertex(this.x, this.y - this.size);
        vertex(this.x - this.size, this.y + this.size);
        vertex(this.x + this.size, this.y + this.size);
        endShape(CLOSE);
        break;

      case 2:
        // Draw the square shape
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size);
        break;
    }
  
  }
  
// updating state of the particles, everytime lifetime is decreased by 1 the position of the particle is changed 
  update() {
    this.move();
    this.lifespan--;
  }
}
//mouse pressed is used as a button here to start the code, basic interactivity 
 function mousePressed(){
    if(start===false){
        sound.play();
    }
    start=true;
 }
