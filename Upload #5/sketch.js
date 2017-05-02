var chr;
var img;
var ghost;
var introMusic;

function preload() {
  
  img = loadImage("pictures/map.png");
  
	ghost = loadAnimation("pictures/ghost1.png","pictures/ghost2.png","pictures/ghost3.png","pictures/ghost4.png");
  introMusic = loadSound("tracks/intro.mp3");
  
}

function setup() { 
  createCanvas(650, 470);
  
  introMusic.loop();
  
  // img = loadImage("pictures/map.png");
  
  
  //frameRate(120);
  
  var clr_R = color(255,0,0);
  
  Main = new Character(clr_R);
  
} 

function draw() { 
  
  Main.displayMap();
  Main.displayCharacter();
	Main.move();
  
  //print(mouseX,",", mouseY);

} // end of draw function //

function Character(clr) {
  
	this.c = clr;
  this.posx = width/2;
  this.posy = height/2;
  
  this.displayCharacter = function() {
    animation(ghost, this.posx, this.posy);
    
  } // end of display character function // 
  
  
  this.displayMap = function() {
    
    var start1 = 0;
    var end1 = 40;
    var start2 = 3;
    var end2 = 0;
  	
  	loadPixels();  // loads the pixels of the canvas
  	img.loadPixels(); // this loads all of the pixels in the image, in an array
  
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
        if ((keyIsPressed) && (key == 'r')) {
          end2 = 2.7;
        }
        //var adjustBright = map(distance, 0, 40, 3, 0);

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
    
    //print(this.posx, ",", this.posy);
    
  } // end of display map function //
  
  this.move = function keyTyped() {
    if (key == 'a') {
  		this.posx -= 10;
      if (this.posx <= 0) {
      	this.posx = 5;
      }
    }
    else if (key == 'w') {
    	this.posy -= 10;
      if (this.posy <= 0) {
      	this.posy = 5;
      }
    }
    else if (key == 'd') {
    	this.posx += 10;
      if (this.posx >= width) {
      	this.posx = width - 5;
      }
    }
    else if (key == 's') {
    	this.posy += 10;
      if (this.posy >= height) {
      	this.posy = height - 5;
      }
    }
    
    var teleportLocations = [[35,25],[535,55],[435,225],[65,305],[115,405],[545,365],[635,465]];
    var randLocation = teleportLocations[int(random(6))];
    var randX = randLocation[0];
    var randY = randLocation[1];
    
    if ((this.posx == 35 && this.posy == 25) ||
        (this.posx == 25 && this.posy == 35) ||
        (this.posx == 25 && this.posy == 25) ||
        (this.posx == 35 && this.posy == 35)) {
      background(0);
      this.posx = randX;
      this.posy = randY;
    }
    // else if (this.posx == 25 && this.posy == 35) {
    //   background(0);
    //   fill(255,0,0);
    //   textSize(30);
    //   text("YOU LOSE", (width/2 - 60), height/2);
    //   textSize(15);
    //   text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
    // 	this.posx = 35;
    //   this.posy = 25;
    // }
    // else if (this.posx == 25 && this.posy == 25) {
    // 	background(0);
    //   fill(255,0,0);
    //   textSize(30);
    //   text("YOU LOSE", (width/2 - 60), height/2);
    //   textSize(15);
    //   text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
    // 	this.posx = 35;
    //   this.posy = 25;
    // }
    // else if (this.posx == 35 && this.posy == 35) {
    // 	background(0);
    //   fill(255,0,0);
    //   textSize(30);
    //   text("YOU LOSE", (width/2 - 60), height/2);
    //   textSize(15);
    //   text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
    // 	this.posx = 35;
    //   this.posy = 25;
    // }
    else if ((this.posx == 525 && this.posy == 55) ||
             (this.posx == 535 && this.posy == 55) ||
             (this.posx == 525 && this.posy == 65) ||
             (this.posx == 535 && this.posy == 65)) {
    	background(0);
    	this.posx = randX;
      this.posy = randY;
    }
    // else if (this.posx == 535 && this.posy == 55) {
    // 	background(0);
    //   fill(255,0,0);
    //   textSize(30);
    //   text("YOU LOSE", (width/2 - 60), height/2);
    //   textSize(15);
    //   text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
    // }
    // else if (this.posx == 525 && this.posy == 65) {
    // 	background(0);
    //   fill(255,0,0);
    //   textSize(30);
    //   text("YOU LOSE", (width/2 - 60), height/2);
    //   textSize(15);
    //   text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
    // }
    // else if (this.posx == 535 && this.posy == 65) {
    // 	background(0);
    //   fill(255,0,0);
    //   textSize(30);
    //   text("YOU LOSE", (width/2 - 60), height/2);
    //   textSize(15);
    //   text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
    // }
    else if ((this.posx == 435 && this.posy == 225) ||
             (this.posx == 445 && this.posy == 225) ||
             (this.posx == 445 && this.posy == 215) ||
             (this.posx == 435 && this.posy == 215)) {
    	background(0);
      this.posx = randX;
      this.posy = randY;
    }
		// else if (this.posx == 445 && this.posy == 225) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 445 && this.posy == 215) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 435 && this.posy == 215) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		else if ((this.posx == 65 && this.posy == 305) ||
             (this.posx == 75 && this.posy == 305) ||
             (this.posx == 75 && this.posy == 315) ||
             (this.posx == 65 && this.posy == 315)) {
      background(0);
      this.posx = randX;
      this.posy = randY;
		}
		// else if (this.posx == 75 && this.posy == 305) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 75 && this.posy == 315) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 65 && this.posy == 315) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		else if ((this.posx == 115 && this.posy == 405) ||
             (this.posx == 125 && this.posy == 405) ||
             (this.posx == 125 && this.posy == 415) ||
             (this.posx == 115 && this.posy == 415)) {
      background(0);
      this.posx = randX;
      this.posy = randY;
		}
		// else if (this.posx == 125 && this.posy == 405) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 125 && this.posy == 415) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 115 && this.posy == 415) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		else if ((this.posx == 545 && this.posy == 365) ||
             (this.posx == 555 && this.posy == 365) ||
             (this.posx == 555 && this.posy == 375) ||
             (this.posx == 545 && this.posy == 375)) {
      background(0);
      this.posx = randX;
      this.posy = randY;
		}
		// else if (this.posx == 555 && this.posy == 365) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 555 && this.posy == 375) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 545 && this.posy == 375) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if ((this.posx == 635 && this.posy == 455) ||
		// (this.posx == {
		// background(0);
		// this.posx = 645;
		// this.posy = 465;
		// }
		else if ((this.posx == 635 && this.posy == 455) ||
             (this.posx == 645 && this.posy == 455) ||
             (this.posx == 635 && this.posy == 465) ||
             (this.posx == 645 && this.posy == 465)) {
		background(0);
		this.posx = randX;
    this.posy = randY;
		}
		// else if (this.posx == 645 && this.posy == 455) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 635 && this.posy == 465) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
		// else if (this.posx == 645 && this.posy == 465) {
		// background(0);
		// fill(255,0,0);
		// textSize(30);
		// text("YOU LOSE", (width/2 - 60), height/2);
		// textSize(15);
		// text("Refresh Browser to Restart Game", (width/2) - 100, (height/2) + 100);
		// }
    
  } // end of movement function //
  
} // end of Character Class //

