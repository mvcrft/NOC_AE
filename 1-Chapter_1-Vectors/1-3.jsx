﻿/*    Here we get a chance to expand on our vector operations library with subtract. It would probably make most sense to write a library of the operations and mirror the functions that are found in Expressions (or Processing. or both?). I'll visualize a line() using the Beam Effect. I've set the beam to 100% length, and we will push the start and end points around. Since there is no interactivity in After Effects, we will have to just move the Ending Point around with some random values.    */function createVector(x_,y_) {    this.x = x_;    this.y = y_;}//let's create the subtract function.vMath = new function() {    this.add  = function(v1,v2){  v1.x += v2.x;  v1.y += v2.y;  };    this.sub  = function(v1,v2){  v1.x -= v2.x;  v1.y -= v2.y;  }}var myComp = app.project.item(3);// Getting the center is something we will do a lot.var centerX = myComp.width/2;var centerY = myComp.height/2;//let's make a quick random number generator with a max value.function randomVal(max){return Math.abs(Math.random())*max;}//It's exhausting to look at this output on every frame! Let's create longer intervals.var interval = 12;var myFrameDuration = myComp.frameDuration*interval;var totalFrames = (myComp.duration * myComp.frameRate)/interval;//here's the Nature of Code vector subtraction example.for (i = 0; i<=totalFrames;i++){        var center = new createVector(centerX,centerY);     //I'll still declare the variable "mouse" to match the Nature of Code sample, even if it's just a random value.    var mouse = new createVector(randomVal(myComp.width),randomVal(myComp.height));        vMath.sub(mouse,center);        //here's our approximation of translate()    mouse.x += myComp.width/2;    mouse.y += myComp.height/2;    //Let's set keyframes on the Beam Effect.     var beamEffect = myComp.layer(1).property("Effects").property("Beam");    beamEffect.property("Starting Point").setValueAtTime(myFrameDuration*i,[centerX,centerY])    beamEffect.property("Ending Point").setValueAtTime(myFrameDuration*i,[mouse.x,mouse.y]);};/*As always, refer to The Nature of Code byDaniel Shiffmanhttp://natureofcode.comfor original examples!*/