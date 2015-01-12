﻿/* First things first. Let's take all that Vector stuff, and make a library out of it. Open up the VectorLib.jsx and notice I've added the static functions and created the getters and setters. Now, we simply need #include to utilize vector objects. We will have one library across all of our examples for Chapter 2. Things will finally be a bit cleaner. I'll keep the Mover class in this ExtendScript file, because we will be modifying and expanding on it.    */#include VectorLib.jsxr = new function(){this.randomVal = function(max){return Math.abs(Math.random())*max;};this.randomRange = function(min,max){return Math.random()*(max-min) + min;};}var myComp = app.project.item(1);var myMover;var Mover = function() {  this.mass = 1;  this.position = createVector(30,30);  this.velocity = createVector(0,0);  this.acceleration = createVector(0,0);};Mover.prototype.applyForce = function(force){    var f = Vector.div(force,this.mass);    this.acceleration.add(f);    }Mover.prototype.update = function(time) {    this.velocity.add(this.acceleration);    this.position.add(this.velocity);    this.acceleration.mult(0);};//I'm passing layerNum into display as well as time.      Mover.prototype.display = function(layerNum,time) {    myComp.layer(layerNum).position.setValueAtTime(time,[this.position.x,this.position.y]);};        //Notice we've updated checkEdges- there is no "ceiling" but everything else will bounce off the "floors"Mover.prototype.checkEdges = function() {    if (this.position.x > myComp.width) {        this.position.x = myComp.width;        this.velocity.x *= -1;        }else if (this.position.x < 0) {            this.velocity.x *= -1;            this.position.x = 0;            };    if (this.position.y > myComp.height) {        this.velocity.y *= -1;        this.position.y = myComp.height;        };};var myFrameDuration = myComp.frameDuration;var totalFrames = myComp.duration * myComp.frameRate;//setup()     myComp.layers.addShape();        var rand = r.randomRange(15,100);    var layerShapeContents = myComp.layer(1).property("ADBE Root Vectors Group");        layerShapeContents.addProperty("ADBE Vector Shape - Ellipse");    layerShapeContents.property("ADBE Vector Shape - Ellipse").property("ADBE Vector Ellipse Size").setValue([rand,rand]);    layerShapeContents.addProperty("ADBE Vector Graphic - Fill");    layerShapeContents.property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue([1,1,1,1]);    layerShapeContents.property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Opacity").setValue(100);//draw()//create the new forces.var wind = createVector(.01,0);var gravity = createVector(0,1);myMover = new Mover();//apply them!for (i = 0; i<=totalFrames;i++){        var time = myFrameDuration*i;    myMover.applyForce(wind);    myMover.applyForce(gravity);        myMover.update(time);    myMover.checkEdges();    myMover.display(1,time);};    /*As always, refer to The Nature of Code byDaniel Shiffmanhttp://natureofcode.comfor original examples!*/    