//variables
  var happyDoggy, Dog, food, stock, database;

function preload(){
//Images
  happyDoggy =loadImage("images/dogImg.png");
  Doggy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(600, 500);

//sett 
  Dog = createSprite(300, 250, 250, 250);
  Dog.addImage(Doggy);
  Dog.scale = 0.5; 

  database = firebase.database();

  stock = database.ref('Food');
  stock.on("value", readStock)
  
}


function draw() { 
  background(46, 139, 87); 

 if(keyWentDown(UP_ARROW)){
    writeStock(food);
    Dog.addImage(happyDoggy);

 } 

  drawSprites();

//texting
  textSize(25);
  fill("brown");
  stroke(255);
  text("Food Left:" + food, 225, 50);
  text("Note: Press the up arrow key to feed your dog", 40, 100);
}

function readStock(data){
   food = data.val();
}

function writeStock(x){
  if(x <= 0){
     x = 0;
  }else{
    x = x - 1;
  }
  
   database.ref('/').update({
     Food:x
   })

}
