var originalImage = null;
var grayImage = null;
var reddisImage = null;
var blueishImage = null;
var rainbowImage = null;
var blurImage = null;
var checkerImage = null;
var imgcanvas = document.getElementById("can");

function upload() {
   var fileinput = document.getElementById("file");
   originalImage = new SimpleImage(fileinput);
   grayImage = new SimpleImage(fileinput);
   reddishImage = new SimpleImage(fileinput);
   blueishImage = new SimpleImage(fileinput);
   rainbowImage = new SimpleImage(fileinput);
   blurImage = new SimpleImage(fileinput);
   checkerImage = new SimpleImage(fileinput);
   originalImage.drawTo(imgcanvas);
}

function imageIsLoaded(image) {
  return (!image == null  || image.complete());
}

//to make image grayscale
function makeGray(image) {
  for (var pixel of image.values()) {
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
  pixel.setRed(avg);
  pixel.setGreen(avg);
  pixel.setBlue(avg);
 }
 return image;
}

//to make image reddish
function makeReddish(image) {
  for (var pixel of image.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg < 128) {
    pixel.setRed(2*avg);
    pixel.setGreen(0);
    pixel.setBlue(0);
    }
    else {
    pixel.setRed(255);
    pixel.setGreen(2*avg - 255);
    pixel.setBlue(2*avg - 255)    
    }
  }
  return image;
}

//to make image blueish
function makeBlueish(image) {
  for (var pixel of image.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (avg < 128) {
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(2*avg);
    }
    else {
    pixel.setRed(2*avg - 255);
    pixel.setGreen(2*avg - 255);
    pixel.setBlue(255)    
    }
  }
  return image;
}

//to make rainbow
function makeRainbow(image) {
  var h = image.getHeight();
  for (var pixel of image.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (y < h/7) {
       if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
       }
       else {
        pixel.setRed(255);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(2*avg - 255)    
       }
    }
    else if (y < 2*h/7) {
       if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
       }
       else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg - 51);
        pixel.setBlue(2*avg - 255)    
       }
    }
    else if (y < 3*h/7) {
       if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
       }
       else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg - 255)    
       }
    }
    else if (y < 4*h/7) {
       if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
       }
       else {
        pixel.setRed(2*avg - 255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg - 255)    
       }
    }
    else if (y < 5*h/7) {
       if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
       }
       else {
        pixel.setRed(2*avg - 255);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(255)    
       }
    }
    else if (y < 6*h/7) {
       if (avg < 128) {
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
       }
       else {
        pixel.setRed(1.2*avg - 51);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(255)    
       }
    }
    else {
       if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
       }
       else {
        pixel.setRed(0.4*avg + 153);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(0.4*avg + 153)    
       }
    }
  }
  return image;
}

//to make blur effect
function makeBlurImage() {
  var newImage = new SimpleImage(blurImage.getWidth(), blurImage.getHeight());
  for (var pixel of blurImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() < 0.5) {
      newImage.setPixel(x, y, pixel);
    }
    else{
      var random = Math.floor(Math.random()*23 - 11);
      var newX = random + x;
      var newY = random + y;
      if (newX > 0 && newX <= blurImage.getWidth() - 1) {
        if (newY > 0 && newY <= blurImage.getHeight() - 1) {
          var newPixel = blurImage.getPixel(newX, newY);
          newImage.setPixel(x, y, newPixel);
        }
      }
    }
  }
  newImage.drawTo(imgcanvas);
}

//to create checker image
function makeChecker(image){
  var h = image.getHeight();
  var w = image.getWidth();
  for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (((x<w/4)||((x>w/2)&&(x<3*w/4))) && ((y<h/4)||((y>h/2)&&(y<3*h/4)))) {
    pixel.setBlue(255);
    }
    else if ((((x>w/4)&&(x<w/2))||(x>3*w/4))&&(((y>h/4)&&(y<h/2))||(y>3*h/4))) {
    pixel.setBlue(255);
    }
    else {
      pixel.setRed(255);
    }
 }
 return image;  
}

//to change the image to original image
function makeOriginal() {
  originalImage.drawTo(imgcanvas);
}

//to clear the canvas
function clearCanvas() {
  var ctx = imgcanvas.getContext("2d");
  ctx.clearRect(0,0,imgcanvas.width,imgcanvas.height);
}


function doGray() {
  if (imageIsLoaded(grayImage)) {     
    makeGray(grayImage);	                      
    grayImage.drawTo(imgcanvas);	    
  }
}
function doReddish() {
  if (imageIsLoaded(reddishImage)) {     
    makeReddish(reddishImage);	                      
    reddishImage.drawTo(imgcanvas);	    
  }
}
function doBlueish() {
  if (imageIsLoaded(blueishImage)) {     
    makeBlueish(blueishImage);	                      
    blueishImage.drawTo(imgcanvas);	    
  }
}
function doRainbow() {
  if (imageIsLoaded(rainbowImage)) {     
    makeRainbow(rainbowImage);	                      
    rainbowImage.drawTo(imgcanvas);	    
  }
}
function doBlurImage() {
  if (imageIsLoaded(blurImage)) {     
    makeBlurImage(blurImage);	                      	    
  }
}
function doCheckers() {
  if (imageIsLoaded(checkerImage)) {     
    makeChecker(checkerImage);	                      	    
    checkerImage.drawTo(imgcanvas);
  }
}