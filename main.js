var song="";
leftwristX=0;
leftwristY=0;
scoreleftwrist=0;

rightwristX=0;
rightwristY=0;
function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video, modelloaded);

    posenet.on('pose', gotposes);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    circle(rightwristX, rightwristY, 25);

    if(rightwristY>0 && rightwristY<=100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML="Speed=0.5x";
    }
    else if(rightwristY>100 && rightwristY<=200){
        song.rate(1);
        document.getElementById("speed").innerHTML="Speed=1x";
    }
    else if(rightwristY>200 && rightwristY<=300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="Speed=1.5x";
    }
    else if(rightwristY>300 && rightwristY<=400){
        song.rate(2);
        document.getElementById("speed").innerHTML="Speed=2x";
    }
    else if(rightwristY>400 && rightwristY<=500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed=2.5x";
    }
    if(scoreleftwrist>0.2){
        fill("red");
        stroke("red");
        circle(leftwristX, leftwristY, 25);
        leftwristY_number=floor(Number(leftwristY));
        volume=leftwristY_number/500;
    
        document.getElementById("volume").innerHTML="volume= "+volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.rate(2.5);
}

function modelloaded(){
    console.log("PoseNet is Initialized");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;

        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;

        console.log("Left Wrist X and Y is "+leftwristX+", "+leftwristY+". Right Wrist X and Y is "+rightwristX+", "+rightwristY+".")
        
    }
}