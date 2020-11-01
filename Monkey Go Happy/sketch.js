
var monkey , monkey_running
var ground, groundImage, invisGround;
var bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime=0;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyCollided=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage= loadImage("ground.png");
}



function setup() {
  createCanvas(600,300);
  
  monkey=createSprite(100,210,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale=0.1;
  //monkey.debug=true;
  monkey.setCollider("rectangle",0,0,monkey.width-       3,monkey.height-3);
  
  
  ground=createSprite(400,290,900,100);
  ground.velocityX=-(4 + survivalTime/20);
  ground.x=ground.width/2;
  ground.addImage(groundImage);
  
  invisGround=createSprite(400,210,900,10);
  invisGround.visible=false;

  bananaGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
  background("lightBlue");
  
  if(gameState===PLAY)
  {
    if(ground.x<76){
      ground.x=ground.width/2;
    }
    
    if(keyDown("space") && monkey.y>=160){
      monkey.velocityY=-13;
    }
    
    monkey.velocityY+=0.8;
    monkey.collide(invisGround);
    console.log(frameCount);
    spawnBanana();
    spawnObstacles();
    getSurvivalTime();
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score+=5;
    }
    
    
    
    stroke("black");
    textSize(20);
    fill("blue");
    text("Score : "+ score, 500,20);
    
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
 
  else if(gameState===END)
  {
    ground.velocityX=0;
    monkey.changeAnimation("collided", monkeyCollided);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityY=0;
    survivalTime=0;
  }
  
  drawSprites();
}

function spawnBanana() {
  if(frameCount%80===0)
  {
    var rand=Math.round(random(120,200))
    var banana=createSprite(600,120,20,20);
    banana.addImage(bananaImage);
    console.log(rand);
    
    banana.y=rand;
    banana.velocityX = -(4 + survivalTime/20);
    bananaGroup.add(banana);
    banana.lifetime=200;
    banana.scale=0.08;
  }
}

function spawnObstacles() {
  if(frameCount%300===0)
  {
    var obstacle=createSprite(600,200,20,20);
    obstacle.addImage(obstacleImage);
    
    obstacle.velocityX = -(4 + survivalTime/20);
    obstacleGroup.add(obstacle);
    obstacle.lifetime=200;
    obstacle.scale=0.1;
    //obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,300,300);
  }
}

function getSurvivalTime(){
  stroke("black");
  textSize(20);
  fill("brown");
  survivalTime=Math.round(frameCount/getFrameRate());
  text("Survival Time: "+ survivalTime, 10, 20);
}
