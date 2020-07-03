function setup() {
    createCanvas(windowWidth, windowHeight);
}

function makeImage(w,h) {
    let imw = w;
    let imh = h;
    let image = createImage(w,h);
    image.loadPixels();
}

function drawBox(x,y,w,h,r,g,b,a) {
    for (let i = x; i < x+w; i++) {
        for (let j = y; j < y+h; j++) {
            index = (i + j*imw)*4;
            image.pixels[index] = r;
            image.pixels[index+1] = g;
            image.pixels[index+2] = b;
            image.pixels[index+3] = a;
        }   
    }
}

function draw() {
    background(20);
}