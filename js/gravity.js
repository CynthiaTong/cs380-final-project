var world;
var boundaries = [];
var spring;
var shapes = [];

var showCanvas = false;

window.onload = function() {

    var boxBtn = document.getElementById("boxBtn");
    var circleBtn = document.getElementById("circleBtn");
    var container = document.getElementById("container");

    boxBtn.addEventListener("click", function() {
        createBoxes();
        hideBtnsShowCanvas();

    });
    circleBtn.addEventListener("click", function() {
        createCircles();
        hideBtnsShowCanvas();
    });
};

function hideBtnsShowCanvas() {
    // container.style.visibility = "hidden";
    container.className = "fadeout";
    boxBtn.disabled = true;
    circleBtn.disabled = true;
    boxBtn.style.cursor = "default";
    circleBtn.style.cursor = "default";

    setTimeout(function() {
        showCanvas = true;
    }, 800);
}

function createBoxes() {
    for (var x = width/12; x < width; x += width/6) {
        for (var y = height/8; y < height; y+= height/4) {
            var box = new Box(x, y);
            shapes.push(box);
        }
    }
}

function createCircles() {

    var windowRatio = width/height;

    for (var x = width/14; x < width; x += width/7) {
        for (var y = width/18; y < height; y += width/7) {
            var circle = new Circle(x, y);
            shapes.push(circle);
        }
    }
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    world = createWorld();

    // x, y, w, h
    boundaries.push(new Boundary(windowWidth/2, windowHeight, windowWidth, 0.1));
    //Vertical boundaries
	boundaries.push(new Boundary(width-0.5, height/2, 0.1, height));
	boundaries.push(new Boundary(0.5, height/2, 0.1, height));

    spring = new Spring();

}


function draw() {
    background(255);

    if (showCanvas) {

        //Time Step
        var timeStep = 1.0/30;

        setTimeout(function() {
            world.Step(timeStep, 10, 10);
        }, 2000);

        //enable mouse joint
        spring.update(mouseX,mouseY);

        if (shapes) {

            for (var i=0; i < shapes.length; ++i) {
                shapes[i].display();
            }

        }

    }

}

// When mouse pressed, create the spring
function mousePressed() {

	for (var i=0; i<shapes.length; ++i) {
        if (shapes[i].contains(mouseX, mouseY))
			spring.bind(mouseX, mouseY, shapes[i]);
    }
}

// When the mouse is released delete the spring
function mouseReleased() {
  	spring.destroy();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
