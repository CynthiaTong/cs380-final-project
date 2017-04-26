
var yPoses = [];
var xPoses = [];

var hues = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();

    frameRate(3);

    colorMode(HSB);

    for (var h = 0; h <= 360; h += 2) {
        hues.push(h);
    }

    for (var y = 0; y < height; y += random(30, 80)) {
        drawHorizontal(y, 0);
        yPoses.push(y);
    }

    for (var x = 0; x < width; x += random(40, 70)) {
        drawVertical(x, 0);
        xPoses.push(x);
    }

}

function drawHorizontal(y, h) {
        fill(hues[h], random(30, 70), random(60, 100));
        rectMode(CENTER);
        rect(width/2, y, width, random(3, 20));
}

function drawVertical(x, h) {
    fill(hues[h], random(30, 70), random(50, 100));
    // fill(0, 122, 204, random(255));
    rectMode(CENTER);
    rect(x, height/2, random(5, 15), height);
}

var hVal = 0;

function draw() {
    background(hues[hVal], 10, 95);

    for (var i in yPoses) {
        yPoses[i] = randomGaussian(yPoses[i], 20);
        drawHorizontal(yPoses[i], hVal);
    }

    for (var j in xPoses) {
        xPoses[j] = randomGaussian(xPoses[j], 20);
        drawVertical(xPoses[j], hVal + 3);
    }

    hVal ++;
    if (hVal >= hues.length) hVal = 0;

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
