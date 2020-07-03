function setup() {

    curHue = 0;
    curColor = color(255,255,255);

    colorGrid = new Array(8).fill(new Array(8).fill(color(0,0,0)));
    curIndex = [0,0];

    createCanvas(windowWidth, windowHeight);
    makeImage(256,256);

    colorMode(HSB,360,100,100,255);

    hueBar = createImage(360,32);
    hueBar.loadPixels();
    for (let i = 0; i < 360; i++) {
        for (let j = 0; j < 32; j++) {
            index = (i + j*360)*4;
            col = color(i,100,100);
            hueBar.pixels[index] = red(col);
            hueBar.pixels[index+1] = green(col);
            hueBar.pixels[index+2] = blue(col);
            hueBar.pixels[index+3] = 255;
        }   
    }
    // hueBar.loadPixels();
    colorMode(RGB,255);

    colorPicker = createImage(200,200);
    colorPicker.loadPixels();
    colorPickerReset();

    saveButton = createButton("Save");
    saveButton.position(432,8);
    saveButton.size(128,32);
    saveButton.mousePressed(function() {
        img.save("ColorGrid", "png");
    });

    hints = [
        ["A","Move left"],
        ["D","Move right"],
        ["W","Move up"],
        ["S","Move down"],
    ]
}

function makeImage(w,h) {
    imw = w;
    imh = h;
    img = createImage(w,h);
    img.loadPixels();
}

function imageBox(x,y,w,h,col) {
    for (let i = x; i < x+w; i++) {
        for (let j = y; j < y+h; j++) {
            index = (i + j*imw)*4;
            img.pixels[index] = red(col);
            img.pixels[index+1] = green(col);
            img.pixels[index+2] = blue(col);
            img.pixels[index+3] = alpha(col);
        }   
    }
}

function draw() {
    
    if(mouseIsPressed) {
        if(mouseX > 8 && mouseX < 368 && mouseY > 8 && mouseY < 40) {
            curHue = mouseX - 8;
            colorPickerReset();
        }

        if(mouseX > 8 && mouseX < 208 && mouseY > 48 && mouseY < 248) {
            colorMode(HSB,360,200,200,255);
            curColor = color(curHue,mouseX-8,mouseY-48);
            colorMode(RGB,255);
            curColor = color(red(curColor),green(curColor),blue(curColor));
            
            colorGrid[curIndex[0],curIndex[1]] = curColor;
            imageBox(curIndex[0]*32,curIndex[1]*32,32,32,curColor);

        }

        if(mouseX > 368 && mouseX < 624 && mouseY > 48 && mouseY < 304) {
            curIndex[0] = Math.trunc((mouseX - 368)/32);
            curIndex[1] = Math.trunc((mouseY - 48)/32);
        }
    }

    background(30);
    img.updatePixels();
    image(img,368,48);

    hueBar.updatePixels();
    image(hueBar,8,8);

    colorPicker.updatePixels();
    image(colorPicker,8,48);

    fill(curColor);
    noStroke();
    square(216,112,64);

    noFill();
    stroke(color(255,255,255,255));
    square(368+curIndex[0]*32,48+curIndex[1]*32,32);
    square(368,48,256);

    for(let i = 0; i < hints.length; i++) {
        text(hints[i][0],8,320+i*32);
        text(hints[i][1],32,320+i*32);
    }
}

function colorPickerReset() {

    colorMode(HSB,360,200,200,255);

    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 200; j++) {
            index = (i + j*200)*4;
            col = color(curHue,i,j);
            colorPicker.pixels[index] = red(col);
            colorPicker.pixels[index+1] = green(col);
            colorPicker.pixels[index+2] = blue(col);
            colorPicker.pixels[index+3] = 255;
        }   
    }

    colorPicker.updatePixels();

    colorMode(RGB,255);
}

function keyIsChar(str) {
    return keyCode == str.toUpperCase().charCodeAt(0);
}

function keyPressed() {
    if (keyIsChar("a")) {
        moveIndex(-1,0);
    }

    if (keyIsChar("d")) {
        moveIndex(1,0);
    }

    if (keyIsChar("s")) {
        moveIndex(0,1);
    }

    if (keyIsChar("w")) {
        moveIndex(0,-1);
    }
}

function moveIndex(x,y) {
    curIndex[0] = clamp(curIndex[0]+x,0,7);
    curIndex[1] = clamp(curIndex[1]+y,0,7);
}

function clamp(val, min, max) {
    return Math.min(Math.max(val,min),max);
}