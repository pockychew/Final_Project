var chr;
var img;
var ghost;

function preload() {
	ghost = loadAnimation("pictures/ghost1.png","pictures/ghost2.png","pictures/ghost3.png","pictures/ghost4.png");
}

function setup() { 
  createCanvas(650, 470);
  
  
  //ghost = loadImage("");
  img = loadImage("pictures/map.png");
  
  
  frameRate(120);
  
  var clr_R = color(255,0,0);
  
  Main = new Character(clr_R);
  
} 

function draw() { 
  
  Main.move();
  Main.displayMap();
  Main.displayCharacter();
  Main.displayLava();
  
  print(mouseX,",", mouseY);

} // end of draw function //

function Character(clr) {
  
	this.c = clr;
  this.posx = width/2;
  this.posy = height/2;
  
  this.displayCharacter = function() {
    animation(ghost, this.posx, this.posy);
    
  } // end of display character function // 
  
  this.displayLava = function() {
    //fill(255,255,255);
    rect(19,19,22,22);
    rect(518,50,22,22);
    rect(58,298,22,22);
    rect(429,210,22,22);
    rect(109,399,22,22);
    rect(538,359,22,22);
    
    if (this.pos
  }
  
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
  } // end of movement function //
  
} // end of Character Class //

