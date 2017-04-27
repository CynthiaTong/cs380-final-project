
function Boundary(x_,y_, w_, h_) {
	this.x = x_;
	this.y = y_;
	this.w = w_;
	this.h = h_;

	var fd = new box2d.b2FixtureDef();
	fd.density = 1.0;
	fd.friction = 0.5;
	fd.restitution = 0.2;

	var bd = new box2d.b2BodyDef();

	bd.type = box2d.b2BodyType.b2_staticBody;
	bd.position = scaleToWorld(this.x, this.y);
	fd.shape = new box2d.b2PolygonShape();
	fd.shape.SetAsBox(this.w/(scaleFactor*2), this.h/(scaleFactor*2));
	this.body = world.CreateBody(bd).CreateFixture(fd);

	  // Draw the boundary
	this.display = function() {
		fill(255);
		noStroke();
		rectMode(CENTER);
		rect(this.x,this.y,this.w,this.h);
	};
}

function Spring(x,y) {
  // At first it doesn't exist
  this.mouseJoint = null;

  // If it exists we set its target to the mouse location
  this.update = function(x, y) {
    if (this.mouseJoint !== null) {
      // Always convert to world coordinates!
      var mouseWorld = scaleToWorld(x,y);
      this.mouseJoint.SetTarget(mouseWorld);
    }
  };

  this.display = function() {
    if (this.mouseJoint !== null) {

      var posA = this.mouseJoint.GetAnchorA();
      var posB = this.mouseJoint.GetAnchorB();

      // We can get the two anchor points
      var v1 = scaleToPixels(posA.x, posA.y);
      var v2 = scaleToPixels(posB.x, posB.y);
    }
  };

  // This is the key function where
  // we attach the spring to an x,y location
  // and the Box object's location
  this.bind = function(x,y,box) {
    // Define the joint
    var md = new box2d.b2MouseJointDef();
    // Body A is just a fake ground body for simplicity (there isn't anything at the mouse)
    md.bodyA = world.CreateBody(new box2d.b2BodyDef());
    // Body 2 is the box's boxy
    md.bodyB = box.body;
    // Get the mouse location in world coordinates
    var mp = scaleToWorld(x,y);
    // And that's the target
    //println(mp.x + " " + mp.y);
    md.target = mp;
    //println(md.target.x + " " + md.target.y);

    // Some stuff about how strong and bouncy the spring should be
    md.maxForce = 1000.0 * box.body.m_mass;
    md.frequencyHz = 5.0;
    md.dampingRatio = 0.9;

    // Make the joint!
    this.mouseJoint = world.CreateJoint(md);
  };

  this.destroy = function() {
    // We can get rid of the joint when the mouse is released
    if (this.mouseJoint !== null) {
      world.DestroyJoint(this.mouseJoint);
      this.mouseJoint = null;
    }
  };
}

class Shape {

    constructor(x, y) {
    }

    contains(x,y) {
      var worldPoint = scaleToWorld(x, y);
      var f = this.body.GetFixtureList();
      var inside = f.TestPoint(worldPoint);
      return inside;
    }

    // Is the shape ready for deletion?
    done() {
     // Let's find the screen position of the shape
     var pos = scaleToPixels(this.body.GetPosition());
     // Is it off the bottom of the screen?
     if (pos.y > height + this.h/2) {
       // destroy body from world
       world.DestroyBody(this.body);
       return true;
     }
       return false;
    }

}

class Box extends Shape {

    constructor(x, y) {
        super(x, y);

        this.w = random(width/8, width/6);
        this.h = random(height/5, height/4);

        // Define a body
        var bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = scaleToWorld(x,y);

        // Define a fixture
        var fd = new box2d.b2FixtureDef();
        // Fixture holds shape
        fd.shape = new box2d.b2PolygonShape();
        fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

        // Some physics
        fd.density = 1.0;
        fd.friction = 0.3;
        fd.restitution = 0.3;

        // Create the body
        this.body = world.CreateBody(bd);
        // Attach the fixture
        this.body.CreateFixture(fd);

        // Some additional stuff
        this.body.SetLinearVelocity(new box2d.b2Vec2(random(-20, -10) + random(10, 20),
                                                     random(-40, -10) + random(3,5)));
        this.body.SetAngularVelocity(random(-10,-5) + random(5, 10));

        this.color = color(random(100,250), random(100,250), random(100,250));
    }

    // Drawing the box
   display() {
       // Get the body's position
       var pos = scaleToPixels(this.body.GetPosition());
       // Get its angle of rotation
       this.a = this.body.GetAngleRadians();

       rectMode(CENTER);
       push();
       translate(pos.x,pos.y);
       rotate(this.a);
       fill(this.color);
       noStroke();
       rect(0, 0, this.w, this.h);
       pop();
   }

}

class Circle extends Shape {

    constructor(x, y) {
        super(x, y);

        this.r = random(width/20, width/16);

        // Define a body
        var bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = scaleToWorld(x,y);

        // Define a fixture
        var fd = new box2d.b2FixtureDef();
        // Fixture holds shape
        fd.shape = new box2d.b2CircleShape();
        fd.shape.m_radius = scaleToWorld(this.r);

        // Some physics
        fd.density = 1.0;
        fd.friction = 1.0;
        fd.restitution = 0.3;

        // Create the body
        this.body = world.CreateBody(bd);
        // Attach the fixture
        this.body.CreateFixture(fd);

        // Some additional stuff
        this.body.SetLinearVelocity(new box2d.b2Vec2(random(-20, -10) + random(10, 20),
                                                     random(-40, -20) + random(3,5)));
        // this.body.SetAngularVelocity(random(-10,-5) + random(5, 10));

        this.color = color(random(100,250), random(100,250), random(100,250));

    }

    // Drawing the box
   display() {
       // Get the body's position
       var pos = scaleToPixels(this.body.GetPosition());

       // Draw!
       rectMode(CENTER);
       push();
       translate(pos.x,pos.y);
       fill(this.color);
          noStroke();
       ellipse(0, 0, this.r*2, this.r*2);
       pop();
    }

}
