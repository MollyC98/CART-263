/**
Final Project, The Dino Experience 
Negar and Mollika 

This is a template. You must fill in the title,
author, and this description to match your project!
*/

// Rube Goldberg setup, update with your own info!
let myName = "negar"; // Who are you? Make sure it matches the previous person's variable!
let nextName = "negar"; // Who is next on the list? Make sure it matches the next person's variable!
let dataToSend;  // Variable to hold the data to send to the next person on the list



// MQTT client details. We are using a public server called shiftr.io. Don't change this.
let broker = {
  hostname: 'public.cloud.shiftr.io',
  port: 443
};
let client;
let creds  = {
  clientID:
  Math.random().toString(16).slice(3),
  userName: 'public',
  password: 'public'
}
let topic = 'CART253'; // This is the topic we are all subscribed to

// End of MQTT client details

let backgroundColor;

// variables to enable the speech, velocity and jump of the dino 
let speech;
let velocity;
let jumping;

// variable to declare the main character of the game 
let dino;

// variable defining the jump position of the dino 
let dinoY
let ellipseY;
//loading a gif for the prototype presentation, the character will be made by the team 
//for the final representation. 

let bgColorChanged = false;

//source of the gif: https://cutewallpaper.org/24x/0jzc6x1vk/2895526449.jpg
function preload() {

 /*dino = loadGif('assets/images/dino.gif');
 
*/

dino = loadImage('assets/images/dino4.gif');

}


function setup() {

  createCanvas(windowWidth,windowHeight);
  
  // Speech Recognition object with callback, first argument defines the language detection
  //second argument defines the function to be called after the language detection.
  speech = new p5.SpeechRec('en-US', gotSpeech);

  // "Continuous recognition" defines if the object should keep listening after recognizing the speech.
  let continuous = true;

  // If you want to try partial recognition (faster, less accurate)
  let interimResults = false;

  // running the object after setting the properties
  speech.start(continuous, interimResults);

  //variables to set the position, velocity of the dino and whether it's jumping 
  dinoY = height/3;
  ellipseY = height/3
  velocity = 0;
  jumping = false;

  // DOM element to display results of the ID "speech" and display it in the console 
  let output = select('#speech');

  // 
  speech.onResult = parseResult;


  // Speech recognized event
  function gotSpeech() {
    // Something is there
    // Get it as a string, you can also get JSON with more info
    console.log(speech);
    if (speech.resultValue) {
      let said = speech.resultString;
      // Show user
    //  output.html(said);
    console.log(said)
    }
  }

  backgroundColor = "white";
}




function draw() {

  background(backgroundColor);
 
  /* if (bgColorChanged) {
    bgColorChanged = false;
  

  } else {
    background(247, 236, 188);
  } */

  
  if (jumping) {
  
    velocity = -10;
    jumping = false;
    
  } else 

  velocity += 0.5;
  dinoY += velocity;
  ellipseY += velocity;


  //scale(-1, 1);

  image(dino, 100, dinoY);
 
 
  dino.resize(200, 200);
  
 
  ellipse(400, ellipseY, 50, 50);

  if(dinoY > height - dino.height){
    dinoY = height - dino.height;
    velocity *= -0.8;
  }

  if(ellipseY > height - 12.5){
    ellipseY = height - 12.5;
    velocity *= -0.8;
  }
/*  background(0);
  fill(2)

   velocity += 0.5;
   dinoY += velocity;

   ellipse(400, dinoY, 50, 50);

   if(dinoY > height -12.5){
    dinoY = height - 12.5;
    velocity *= -0.8;
   } */

}

function parseResult() {
  //convert all results to lowercase
  let lowStr = speech.resultString.toLowerCase();
  // recognition system will often append words into phrases. 
  // so the hack here is to only use the last word:
  let mostrecentword = lowStr.split(' ').pop();
  // ellipse(250, dinoY, 50, 50);
  // identify a few keywords and set up some responses

  // respond with a color by drawing a red rectangle the size of the canvas
  if (mostrecentword.indexOf("jump") !== -1) {
    //dinoY -= 50
    
    jumping = true;
    velocity = -10;
    bgColorChanged = false;

    //respond with color and text
  } 
  
   else if (mostrecentword.indexOf("green") !== -1) {
    /*bgColorChanged = true;
    fill(0, 255, 0);
    noStroke();
    rect(0, 0, width, height);*/
    backgroundColor="green";
   
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('like a tree', width / 2, height / 2);

    // respond by color and speech
  } else if (mostrecentword.indexOf("blue") !== -1) {
    backgroundColor="blue";

    //speech.s('blue');

    //to stop the voice from repeating
  } else if (mostrecentword.indexOf("pink") !== -1) {
    backgroundColor="pink";

    //speech.s('blue');

    //to stop the voice from repeating
  } else if (mostrecentword.indexOf("purple") !== -1) {
    backgroundColor="purple";

    //speech.s('blue');

    //to stop the voice from repeating
  } else if (mostrecentword.indexOf("stop") !== -1) {
    speech.speak('ok.');
  } 

  console.log(mostrecentword); 

}


// everytime mouse is pressed send a message
function mouseReleased() {
  //if (pictureTaken === true) {
   sendMQTTMessage(30);
 //
 //}
 }
 
 
 
 // When a message arrives, do this:
 function onMessageArrived(message) {
   let dataReceive = split(trim(message.payloadString), "/");// Split the incoming message into an array deliniated by "/"
   console.log("Message Received:");
   console.log(String(dataReceive[1]));
 /* check to see if the received data is for me, if it is, set it as a variable
  and create a button called snap at x=10 y=10 position that takes a picture when pressed */
   if(dataReceive[1] == myName){
     console.log("Its for me! :) ");
     data = dataReceive[2];
     button = createButton('snap');
     button.mousePressed(takesnap);
     button.position(10, 10);
     console.log(dataReceive[2]);
   } else {
     console.log("Not for me! :( ");
 
     // 0 is who its from (sender)
     // 1 is who its for (receiver)
     // 2 is the data
   }
 }
 
 // Sending a message
 function sendMQTTMessage(msg) {
       message = new Paho.MQTT.Message(myName + "/" + nextName +"/"+ msg ); // add messages together:
 // My name + Next name + data separated by /
       message.destinationName = topic;
       console.log("Message Sent!");
       client.send(message);
 
 }
 
 // Callback functions
 function onConnect() {
   client.subscribe(topic);
   console.log("connected");
   // is working
 }
 function onConnectionLost(response) {
   if (response.errorCode !== 0) {
     // If it stops working
   }
 }
 function MQTTsetup(){
   client = new Paho.MQTT.Client(broker.hostname, Number(broker.port), creds.clientID);
   client.onConnectionLost = onConnectionLost;
   client.onMessageArrived = onMessageArrived;
   client.connect({
         onSuccess: onConnect,
     userName: creds.userName, // username
     password: creds.password, // password
     useSSL: true
   });
 }
 
