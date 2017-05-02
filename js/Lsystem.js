// L-SYSTEMS
var x, y;
var currentangle = 0;
var step = 30;
var angle;
var numloops = 5; // how many iterations to pre-compute
var rules = [];
var str = ''; // "axiom" or start of the string
var posInString = 0; // current position in string

var showCanvas = false;

window.onload = function() {

    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");

    var container = document.getElementById("container");

    btn1.addEventListener("click", function() {
        // Sierpinski triangle
        str = 'A';
        angle = 60; // how much the turtle turns with a '-' or '+'
        rules[0] = ['A', '-B+A+B-'];
        rules[1] = ['B', '+A-B-A+'];
        x = 0;
        y = height-5;

        hideBtnsShowCanvas();

    });

    btn2.addEventListener("click", function() {
        //Koch Curve
        str = 'A';
        angle = 90;
        step = 20;
        rules[0] = ['A', 'A-A+A+A-A'];
        x = 0;
        y = height-5;

        hideBtnsShowCanvas();
    });

    btn3.addEventListener("click", function() {
        str = 'A+A+A+A';
        angle = 90;
        step = 30;
        rules[0] = ['A', 'AA+A-A+A+AA'];
        x = width/3;
        y = height/2;

        hideBtnsShowCanvas();
    });

};

function setup() {
        createCanvas(windowWidth, windowHeight);
        background(255);
        stroke(0, 0, 0, 255);
        frameRate(30);
}


function hideBtnsShowCanvas() {
    container.className = "fadeout";
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    btn1.style.cursor = "default";
    btn2.style.cursor = "default";
    btn3.style.cursor = "default";

    setTimeout(function() {

        showCanvas = true;
        // populate the string
        for (var i = 0; i < numloops; i++) {
          str = lindenmayer(str);
        }

    }, 800);
}

function draw() {

    if (showCanvas) {
        // draw the current character in the string:
        drawChar(str[posInString]);

        posInString++;
        if (posInString > str.length-1) {
            posInString = 0;
        }
    }

}

// interpret an L-system
function lindenmayer(s) {
  var outputstring = '';
  // iterate through 'rules' looking for symbol matches:
  for (var i = 0; i < s.length; i++) {
    var ismatch = 0; // by default, no match
    for (var j = 0; j < rules.length; j++) {
      if (s[i] == rules[j][0])  {
        outputstring += rules[j][1]; // write
        ismatch = 1; // we have a match, so don't copy over symbol
        break;
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch === 0) outputstring += s[i];
  }

  return outputstring;
}

// draw character commands
function drawChar(k) {

  if (k === 'A' || k === 'B') { // draw forward
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
    line(x, y, x1, y1); // connect the old and the new

    // update position:
    x = x1;
    y = y1;
  } else if (k === '+') {
    currentangle += angle; // turn left
  } else if (k === '-') {
    currentangle -= angle; // turn right
  }

  var r = random(100, 250);
  var g = random(100, 250);
  var b = random(100, 250);
  var a = random(50, 100);

  var radius = 10;
  radius += random(0, windowWidth/80);
  radius += random(0, windowWidth/80);
  radius += random(0, windowWidth/80);
  radius = radius/3;

  fill(r, g, b, a);
  ellipse(x, y, radius, radius);
}
