// GLOBAL VARIABLES //
var img;
var ghost;
var buster;
var introMusic;
var speed = 0.15;
//////////////////////

function preload() {
  buster = loadImage("pictures/noghost.png"); // ghost buster png made by me //
  
  img = loadImage("pictures/map.png"); // map was made by me //
  
  /* ghost pixel png made by me (although I did use a picture from
  google to help me sketch it out). "loadAnimation" is from
  p5.js's play library. */
	ghost = loadAnimation("pictures/ghost1.png","pictures/ghost2.png","pictures/ghost3.png","pictures/ghost4.png");
  
  /* Music was downloaded from youtube from: 
  https://www.youtube.com/watch?v=BPuvMcrms8Q 
  Youtube Song Title/ Name: Pokemon - Lavender Town Music - 8bit */
  introMusic = loadSound("tracks/intro.mp3"); // "loadSound" is from p5.js sound library //
  /////////////////////////////////////////////////////////////////
}

function setup() { 
  
  createCanvas(650, 470); // also the map.png WxH //
  
  introMusic.loop();
  
  RPG = new Game();
  
} 

function draw() { 
	
  RPG.displayMap();
  RPG.displayCharacter();
	RPG.catcher();
  RPG.move();
  
  //print(mouseX,",", mouseY);

} // end of draw function //

function Game() {
  
  // Ghost starting position //
  this.posx = width/2; 
  this.posy = height/2;
  /////////////////////////////
  
  // Ghost Buster starting position //
  this.a = 325;
  this.b = 55;
  ////////////////////////////////////
  
  this.displayCharacter = function() {
    noTint();
    /* "animation" uses p5.js's play library */
    animation(ghost, this.posx, this.posy);
  } // end of display character function // 
  
  this.catcher = function() {
  	imageMode(CENTER);
    ///////////////////////////////////////////////////////////
    /* since I couldnt find a way to have the image beneath the 
    	 shadows, I decided to make the image into a shadow
       so that the blackness covers it for me but changing the 
       opacity */
    tint(0,0,0,100); 
    ///////////////////////////////////////////////////////////
    var targetX = this.posx;
    var targetY = this.posy;
    
    var dx = targetX - (this.a);
    this.a += dx * speed*PI;
    
    var dy = targetY - (this.b);
    this.b += dy * speed*PI;
    
    image(buster, this.a, this.b, 30, 30);
    
    // print(this.posx, ",", this.posy);
    // print("          ", int(this.a),"," ,int(this.b)+1);
    
    if ((int(this.a)) == this.posx && (int(this.b)) == this.posy) {
    	speed = 1000;
      background(0);
      textSize(64);
      fill(255,0,0);
      text("R.I.P", (width/2) - 90, height/2);
    }
    else if ((int(this.a)+1) == this.posx && (int(this.b)) == this.posy) {
    	speed = 1000;
      background(0);
      textSize(64);
      fill(255,0,0);
      text("R.I.P", (width/2) - 90, height/2);
    }
    else if ((int(this.a)) == this.posx && (int(this.b)+1) == this.posy) {
    	speed = 1000;
      background(0);
      textSize(64);
      fill(255,0,0);
      text("R.I.P", (width/2) - 90, height/2);
    }
    else if ((int(this.a)+1) == this.posx && (int(this.b)+1) == this.posy) {
    	speed = 1000;
      background(0);
      textSize(64);
      fill(255,0,0);
      text("R.I.P", (width/2) - 90, height/2);
    }
  
  } // end of ghost buster display // 
  
  
  this.displayMap = function() {
    
    // values to control the "Flashlight" radius, brightness, etc //
    var start1 = 0;
    var end1 = 40;
    var start2 = 3;
    var end2 = 0;
    ////////////////////////////////////////////////////////////////
    
    /* CODE BELOW RETRIEVED FROM KATHERINE BENNETT'S GITHUB REPO
    AT:
    DM-GY-6063-B-CreativeCodingFA16 >> week8 >> 03_imageFlashlight >> sketch.js
    URL:
    https://github.com/IDMNYU/DM-GY-6063-B-CreativeCodingFA16/blob/master/wk8/03_imageFlashlight/sketch.js */
    
  	loadPixels();  // loads the pixels of the canvas
  	img.loadPixels(); // this loads all of the pixels in the image, in an array
    
    
    // this nested for loop seems to take a LOT of processing // 
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        // going over the image's pixels
        var pix = (x + y * width) * 4; // pulling out one pixel at a time to work with
        var r = img.pixels[pix];  // pulling out red value
        var g = img.pixels[pix + 1]; // pulling out green value
        var b = img.pixels[pix + 2]; // pulling out blue value

        //var distance = dist(x, y, mouseX, mouseY); 
        var distance = dist(x, y, this.posx, this.posy); 
        // manipulate that information
        var adjustBright = map(distance, start1, end1, start2, end2);
        //var adjustBright = map(distance, 0, 40, 3, 0);
        
        /* added if statement by myself where if you press r you can expand
        	 how far you can see */
        if ((keyIsPressed) && (key == 'r')) {
          end2 = 2.7;
        }
        ///////////////////////////////////////////////////////////////
        
        r *= adjustBright;
        g *= adjustBright;
        b *= adjustBright;
        // here we are putting them in the canvas's pixels
        pixels[pix] = r;
        pixels[pix + 1] = g;
        pixels[pix + 2] = b;
        pixels[pix + 3] = 256;
      }
    }
  
    updatePixels(); // update the entire canvas
    /////////////////// KATHERINE'S CODE ENDS HERE //////////////////////////
    
//////////////////  ??????????????????????????????  ////////////////    
    /* gives a "buster.attractionPoint" is not a function error
    	 even though the function is written in the p5.js 
       play library already...bug? */
    
    // buster.attractionPoint(0.2, this.posx, this.posy);
////////////////////////////////////////////////////////////////////    
    
  } // end of display map function //
  
  ////////////////////////////// WASD Movement /////////////////////////////////
  this.move = function keyTyped() {
    if (key == 'a') {
  		this.posx -= 10; // move to the left by 10 units //
      if (this.posx <= 0) {  // if you hit the left side of map //
      	this.posx = 5;       // stop in x-dir left //
      }
    }
    else if (key == 'w') {
    	this.posy -= 10; // move up by 10 units //
      if (this.posy <= 0) {	 // if you hit the top of the map //
      	this.posy = 5;			 // stop in y-dir up // 
      }
    }
    else if (key == 'd') { 
    	this.posx += 10; // move to the right by 10 units //
      if (this.posx >= width) {		// if you hit the right of the map //
      	this.posx = width - 5; 		// stop in x-dir right //
      }
    }
    else if (key == 's') {
    	this.posy += 10;	// move down by 10 units //
      if (this.posy >= height) {	// if you hit the bottom of the map //
      	this.posy = height - 5;		// stop in y-dir down //
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    
    ////////////////// array of the coordinates of all 7 "teleporters" /////////////////////////
    var teleportLocations = [[35,25],[535,55],[435,225],[65,305],[115,405],[545,365],[635,465]];
    ////////////////////////////////////////////////////////////////////////////////////////////
    
    // choose a random teleporter out of a possible 7 //
    var randLocation = teleportLocations[int(random(6))];
    ////////////////////////////////////////////////////
    
    // get the x and y coordinates of the randomly chosen teleporter //
    var randX = randLocation[0];
    var randY = randLocation[1];
    ///////////////////////////////////////////////////////////////////
    
    /* Code below basically says, if you hit a teleporting area
    (coordinates to be more specific), then briefly change background to
    black for a moment (to show teleportation? but it is kind of slow,
    might remove background later on) and choose a new x and y 
    coordinate for your character to pop up in. locations are chosen
    randomly from the array explained above */
    if ((this.posx == 35 && this.posy == 25) ||
        (this.posx == 25 && this.posy == 35) ||
        (this.posx == 25 && this.posy == 25) ||
        (this.posx == 35 && this.posy == 35)) {
      //background(0);
      speed = 0.01;
      this.posx = randX-10;
      this.posy = randY-10;
    }
    else if ((this.posx == 525 && this.posy == 55) ||
             (this.posx == 535 && this.posy == 55) ||
             (this.posx == 525 && this.posy == 65) ||
             (this.posx == 535 && this.posy == 65)) {
    	//background(0);
      speed = 0.01;
    	this.posx = randX-10;
      this.posy = randY-10;
    }
    else if ((this.posx == 435 && this.posy == 225) ||
             (this.posx == 445 && this.posy == 225) ||
             (this.posx == 445 && this.posy == 215) ||
             (this.posx == 435 && this.posy == 215)) {
    	//background(0);
      speed = 0.01;
      this.posx = randX-10;
      this.posy = randY-10;
    }
		else if ((this.posx == 65 && this.posy == 305) ||
             (this.posx == 75 && this.posy == 305) ||
             (this.posx == 75 && this.posy == 315) ||
             (this.posx == 65 && this.posy == 315)) {
      //background(0);
      speed = 0.01;
      this.posx = randX-10;
      this.posy = randY-10;
		}
		else if ((this.posx == 115 && this.posy == 405) ||
             (this.posx == 125 && this.posy == 405) ||
             (this.posx == 125 && this.posy == 415) ||
             (this.posx == 115 && this.posy == 415)) {
      //background(0);
      speed = 0.01;
      this.posx = randX-10;
      this.posy = randY-10;
		}
		else if ((this.posx == 545 && this.posy == 365) ||
             (this.posx == 555 && this.posy == 365) ||
             (this.posx == 555 && this.posy == 375) ||
             (this.posx == 545 && this.posy == 375)) {
      //background(0);
      speed = 0.01;
      this.posx = randX-10;
      this.posy = randY-10;
		}
		else if ((this.posx == 635 && this.posy == 455) ||
             (this.posx == 645 && this.posy == 455) ||
             (this.posx == 635 && this.posy == 465) ||
             (this.posx == 645 && this.posy == 465)) {
		//background(0);
    speed = 0.01;
		this.posx = randX-10;
    this.posy = randY-10;
		}
		speed = 0.15;
  } // end of movement function //
  
} // end of Character Class //

