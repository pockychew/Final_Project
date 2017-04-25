var chr;

function setup() { 
  createCanvas(620, 460);
  
  frameRate(120);
  
  var clr_R = color(255,0,0);
  
  Main = new Character(clr_R);
  
} 

function draw() { 
  background(220);
  
  Main.display();
  Main.displayFog();
  Main.updateL();
  Main.updateU();
  Main.updateR();
  Main.updateD();
  
} // end of draw function //

function Character(clr) {
  
	this.c = clr;
  this.posx = width/2;
  this.posy = height/2;
  
  this.display = function() {
  	stroke(0);
    strokeWeight(2);
    fill(this.c);
    rectMode(CENTER);
    rect(this.posx, this.posy, 15, 15);
  } // end of display function // 
  
  this.displayFog = function() {
  	stroke(0);
    strokeWeight(350);
    noFill();
    ellipseMode(CENTER);
    ellipse(this.posx, this.posy, 450, 450);
  }
  
  this.updateL = function keyTyped() {
    if (key == 'a') {
  		this.posx -= 5;
    }
  }
  
  this.updateU = function keyTyped() {
    if (key == 'w') {
  		this.posy -= 5;
    }
  }
  
  this.updateR = function keyTyped() {
    if (key == 'd') {
  		this.posx += 5;
    }
  }
  
  this.updateD = function keyTyped() {
    if (key == 's') {
  		this.posy += 5;
    }
  }
  
  
} // end of Character Class //

