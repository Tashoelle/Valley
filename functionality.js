var canvas = document.getElementById("background");
var ctx = canvas.getContext("2d");
canvas.width = 2880;
canvas.height = 1462;
var pics = [
    "1_-_BKG.png",
    "2_-_BKG.png",
    "3_-_BKG.png",
    "4_-_MDG.png",
    "5_-_MDG.png",
    "6_-_FRG.png",
    "7_-_FRG.png"
];

var paralaxMultis = [
    0,
    0.01,
    0.05,
    0.075,
    0.125,
    0.15,
    0.15
]

var images = [];

for(var i=0;i<pics.length;i++) {
    var temp = new Image();
    temp.src = pics[i];
    images.push(temp);
}

var width = 0;
var height = 0;
var mousePos = {x:0,y:0};

var imgCanv = document.createElement("canvas");
var imgCtx = imgCanv.getContext("2d");

images[0].onload = function() {
    width = images[0].width;
    height =images[0].height;
    imgCanv.width = width;
    imgCanv.height = height;
}  

document.getElementById("inputEater").addEventListener("mousemove",function(e) {
    mousePos.x=e.offsetX;
    mousePos.y=e.offsetY;
});

function update() {
    var cwidth = document.body.clientWidth;
    var cheight = document.body.offsetHeight < window.innerHeight ?  window.innerHeight : document.body.offsetHeight;
    document.getElementById("inputEater").width = cwidth;
    document.getElementById("inputEater").height = cheight;

    if(cwidth/2 > cheight) {
        canvas.style.width = "100%";
        canvas.style.height = "";
    } else {
        canvas.style.width = "";
        canvas.style.height = "100%";
    }

    var offX = mapRange(mousePos.x-(cwidth/2),-cwidth/2,cwidth/2,-4500,4500);
    var offY = mapRange(mousePos.y-(cheight/2),-cheight/2,cheight/2,-200,2000);
    
    for(var i=0;i<images.length-1;i++) {
        imgCtx.drawImage(images[i],offX * paralaxMultis[i],offY * paralaxMultis[i]);
        if(i===5) {
            i++;
            imgCtx.globalCompositeOperation = "lighter";
            imgCtx.drawImage(images[i],offX * paralaxMultis[i],offY * paralaxMultis[i]);
        }
    }
    imgCtx.globalCompositeOperation = "source-over";

    ctx.drawImage(imgCanv,-imgCanv.width/2 + canvas.width/2,-imgCanv.height/2 + canvas.height/2);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function mapRange(value,valueLow,valueHigh,remappedLow,remappedHigh) {
    return remappedLow + (remappedHigh - remappedLow) * (value - valueLow) / (valueHigh - valueLow);
}