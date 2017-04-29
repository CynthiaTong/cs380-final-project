
var particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    var numParticles = random(50, 60);

    for (var i=0; i < numParticles; i++) {
        particles.push(new Particle(random(10, width-10), random(10, height-10), createVector(-0.05, 0.05)));
    }

}

function draw() {
    background(0);

    for (var i=0; i < particles.length-1; i++) {
        particles[i].draw(particles[i+1]);
    }
    // draw the last particle
    particles[particles.length-1].draw(undefined);
}

function randomColor() {
	var r = random(50, 230);
	var g = random(50, 230);
	var b = random(50, 230);

	return [r,g,b];
}

class Particle {

    constructor(posX, posY, velocity) {
        this.pos = createVector(posX, posY);
        this.v = createVector(velocity.x, velocity.y);
        this.r = random(8, 15);
    }

    draw(pOther) {
        this.update();
        this.display(pOther);
    }

    border() {
      if (this.pos.x < this.r || this.pos.x > width - this.r) this.v.x *= -1;
      if (this.pos.y < this.r || this.pos.y > height - this.r) this.v.y *= -1;
    }

    update() {

        this.v.x += random(-0.02, 0.02);
        this.v.y += random(-0.02, 0.02);

        if (abs(this.v.mag()) > 0.1) {
            this.v.x *= 0.5;
            this.v.y *= 0.5;
        }


        this.border();

        this.pos.add(this.v);
    }

    display(other) {

        if (other) {
            var dist = p5.Vector.dist(this.pos, other.pos);
            var lineStroke = map(dist, 0, sqrt(width*width + height*height), 0, 250);

            stroke(255 - lineStroke);
            line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        }

        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);

    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
