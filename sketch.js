//for declaring the sprites
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime=0;
var back_ground ,bgImage;
var ground;
var monkeySound;
var gameover,gameoverImage;
var restart,restartImage;
//for loading the images,animation and sounds
function preload(){
monkey_running =       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("g1.png");
  monkeySound = loadSound("Sword-Slice-Quick-Transition-www.fesliyanstudios.com.mp3");
  gameoverImage=loadImage("j3.jpg");
  restartImage=loadImage("res6.png");
}

function setup() {
createCanvas(400,400);
//for creating the background
back_ground = createSprite(0,0,400,400);
back_ground.addImage("background",bgImage);
back_ground.velocityX=-4;
back_ground.x=back_ground.width/4;
back_ground.scale=1;
//for creating the monkey  
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.2;
//for creating the ground     
ground = createSprite(400,380,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.visible=false; 
  
gameover=createSprite(200,200,0,0);
gameover.addImage("gameover",gameoverImage);
gameover.scale=1.5;
restart=createSprite(200,350,0,0);
restart.addImage("gameover",restartImage);
restart.scale=0.2;
//for creating the groups
foodGroup = createGroup(); 
obstacleGroup = createGroup();
//monkey .setCollider("circle",0,0);
//monkey.debug = true;
}


function draw() {
background("white");
//for making the things happen in play state
if(gameState===PLAY){

  gameover.visible=false;
  restart.visible=false;
back_ground.velocityX = -4;
  
  if(back_ground.x<0){
  back_ground.x=back_ground.width/2;
  }
  
ground.velocityX = -4;
  
  if(ground.x<0){
  ground.x=ground.width/2;
  }
  
monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y >= 100) {
  monkey.velocityY = -12;
    }
  
monkey.velocityY = monkey.velocityY + 0.9
  
//survivalTime=survivalTime+Math.round(getFrameRate()/60);

  if(monkey.isTouching(foodGroup)){
    survivalTime=survivalTime+1;
}
  
createFood();
createObstacles();
  
  if(monkey.isTouching(foodGroup)){
   foodGroup.destroyEach();
   monkeySound.play();
   }
}
//for making the things happen in end state
  else if(gameState===END){
     ground.velocityX=0;
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     monkey.velocityY=0;
     back_ground.velocityX=0;
     foodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     foodGroup.destroyEach();
     obstacleGroup.destroyEach();
     gameover.visible = true;
      restart.visible = true;
       if(mousePressedOver(restart)){
    reset();
     }
     }
//for making the state end when monkey is touching the obstacles
if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
  

   
drawSprites();
//for displaying the text 
stroke("black");
strokeWeight(5);
textSize(20);
fill("red");
text("Survival Time: "+survivalTime,100,50);
  
}
//for creating the food 
function createFood (){
if(frameCount % 80===0){
var food = createSprite(400,200,0,0);
food.addImage("food",bananaImage);
food.scale=0.1;
food.y=Math.round(random(120,200));
food.velocityX=-6;
food.lifetime=150;
foodGroup.add(food);  
}
}
//for creatin g the obstacles
function createObstacles(){
if(frameCount % 300===0){
var obstacle = createSprite(400,330,10,40);
obstacle.addImage("obstacle",obstacleImage)
obstacle.velocityX = -6;
obstacle.x=Math.round(random(400,500));
obstacle.scale=0.3;
obstacle.lifetime=150;
obstacleGroup.add(obstacle);

   }
}
function reset(){
gameState=PLAY;
gameover.visible=false;
restart.visible=false;
survivalTime=0;
}


