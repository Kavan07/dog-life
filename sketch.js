var dog;
var database;

function preload() {
    dogIMG = loadImage("dog.png");
    dogIMG1 = loadImage("dog2.png");
    dogIMG2 = loadImage("dog2.png");
    dogIMG3 = loadImage("dog2.png");
    dogIMG4 = loadImage("dog2.png");
    foodIMG = loadImage("food.png");
    milkIMG = loadImage("milk.png");
    playIMG = loadImage("play.png");
    sleepIMG = loadImage("sleep.png");
}

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    dog = createSprite(250,250,10,10);
    dog.addImage(dogIMG);

    food = createSprite(250, 50, 30, 30);
    food.addImage(foodIMG);
    food.scale = 0.4;

    milk = createSprite(250, 450, 30, 30);
    milk.addImage(milkIMG);
    milk.scale = 0.4;

    sleep = createSprite(50, 250, 30, 30);
    sleep.addImage(sleepIMG);
    sleep.scale = 0.4;

    play = createSprite(450, 250, 30, 30);
    play.addImage(playIMG);
    play.scale = 0.4;

    foodStock = database.ref('foodStock');
    foodStock.on("value",readStock);
    milkStock = database.ref('milkStock');
    milkStock.on("value",readStock2);
    sleepTime = database.ref('sleepTime');
    sleepTime.on("value",readStock3);
    playTime  =  database.ref('playTime');
     playTime.on("value",readStock4);
}

function draw(){
    background("white");
    fill("red");
        if(keyWentDown(LEFT_ARROW)){
            dog.addImage(dogIMG4);
            writeStock4(sleepTime);
        }
        if(keyWentDown(RIGHT_ARROW)){
            dog.addImage(dogIMG3);
            writeStock3(playTime);
        }
        if(keyWentDown(UP_ARROW)){
            writeStock(foodStock);
            dog.addImage(dogIMG1);
        }
        if(keyWentDown(DOWN_ARROW)){
            dog.addImage(dogIMG2);
            writeStock2(milkStock);
        }
        if(keyWentUp(LEFT_ARROW)){
            dog.addImage(dogIMG);
            writeStock4(sleepTime);
        }
        if(keyWentUp(RIGHT_ARROW)){
            dog.addImage(dogIMG);
            writeStock3(playTime);
        }
        if(keyWentUp(UP_ARROW)){
            writeStock(foodStock);
            dog.addImage(dogIMG);
        }
        if(keyWentUp(DOWN_ARROW)){
            dog.addImage(dogIMG);
            writeStock2(milkStock);
        }
        
    drawSprites();
    text(foodStock, 300, 50);
    text(milkStock, 300, 450);
    text(playTime , 380, 250);
    text(sleepTime, 100, 250);
}
function readStock(data) {
    foodStock = data.val();
}

function readStock2(data2) {
    milkStock = data2.val();
}

function readStock3(data3) {
    sleepTime = data3.val();
}

function readStock4(data4) {
    playTime = data4.val();
}

function writeStock(x) {

    if(x <= 0) {
      x = 0;
    }
    else {
        x = x - 1
    }

    database.ref('/').update({
        foodStock:x,
    })
}

function writeStock2(y) {
    if(y <= 0) {
        y = 0;
      }
      else {
          y = y - 1
      }
  
      database.ref('/').update({
          milkStock:y
      })
}

function writeStock3(z) {
    if(z <= 0) {
        z = 0;
      }
      else {
          z = z - 1
      }
  
      database.ref('/').update({
          playTime:z
      })
}

function writeStock4(a) {
    if(a <= 0) {
        a = 0;
      }
      else {
          a = a - 1
      }
  
      database.ref('/').update({
          sleepTime:a
      })
}