var chr;
var img;

function setup() { 
  createCanvas(544, 432);
  
  img = loadImage("pictures/cave.png");
  
  //frameRate(120);
  
  var clr_R = color(255,0,0);
  
  Main = new Character(clr_R);
  
} 

function draw() { 
  
  Main.displayMap();
  Main.displayCharacter();
  Main.updateL();
  Main.updateU();
  Main.updateR();
  Main.updateD();
  
} // end of draw function //

function Character(clr) {
  
	this.c = clr;
  this.posx = width/2;
  this.posy = height/2;
  
  this.displayCharacter = function() {
   	 stroke(0);
     strokeWeight(2);
     fill(this.c);
     rectMode(CENTER);
     rect(this.posx, this.posy, 15, 15);
    
  } // end of display character function // 
  
  this.displayMap = function() {
  	
    loadPixels();  // loads the pixels of the canvas
  	img.loadPixels(); // this loads all of the pixels in the image, in an array....called pixels.!!!
  
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        // going over the image's pixels
        var pix = (x + y * width) * 4;  // pulling out one pixel at a time to work with
        var r = img.pixels[pix];  // pulling out red value
        var g = img.pixels[pix + 1]; // pulling out green value
        var b = img.pixels[pix + 2]; // pulling out blue value

        //var distance = dist(x, y, mouseX, mouseY); 
        var distance = dist(x, y, this.posx, this.posy); 
        // manipulate that information
        var adjustBright = map(distance, 0, 30, 3, 0);

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
  
  this.updateL = function keyTyped() {
    if (key == 'a') {
  		this.posx -= 5;
      if (this.posx <= 0) {
      	this.posx = 5;
      }
    }
  }
  
  this.updateU = function keyTyped() {
    if (key == 'w') {
  		this.posy -= 5;
      if (this.posy <= 0) {
      	this.posy = 5;
      }
    }
  }
  
  this.updateR = function keyTyped() {
    if (key == 'd') {
  		this.posx += 5;
      if (this.posx >= width) {
      	this.posx = width-5;
      }
    }
  }
  
  this.updateD = function keyTyped() {
    if (key == 's') {
  		this.posy += 5;
      if (this.posy >= height) {
      	this.posy = height-5;
      }
    }
  }
  
  
} // end of Character Class //

