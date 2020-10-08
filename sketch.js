var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground,groundImg;
var trex,trex_running,trex_collided;
var cloudsGroup,cloudImg;
var obstaclesGroup,obstacle,obstacle1, obstacle2, obstacle3, obstacle4;
var score;
function preload() {
groundImg = loadImage("ground.png");
  
trex_running   = loadAnimation("trex_1.png","trex_2.png","trex_3.png");  
cloudImage = loadImage("cloud.png"); 
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");  
  
}

function setup() {  

      
  createCanvas(windowWidth, windowHeight)
  
ground = createSprite(width/2,height,width,2);  
ground.addImage(groundImg);  
ground.velocityX = -2; 
  
  
trex = createSprite(70,450,50,50)
trex.addAnimation("running", trex_running);
//trex.addAnimation("collided", trex_collided);
trex.setCollider('circle',0,0,350)
trex.scale = 0.1;
//trex.debug=true  
 

score = 0;  
}

function draw() {
  background("lightBlue")
  text("Score: "+ score, 250,50);
  textSize(50)
  
   if(gameState === PLAY){
  if((keyDown("SPACE")) && trex.y  >= height-120) {
      trex.velocityY = -12;
      
    }
     
     trex.changeAnimation("collided", trex_collided);
  //  trex.velocityY = trex.velocityY + 0.8
  
     ground.velocityX = -(4 + 3* score/100)
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      
    score = score + Math.round(getFrameRate()/60);
     
// spawn the clouds     
spawnclouds();
spawnObstacles();
   } 
     else if (gameState === END) {
     gameOver.visible = true;
      restart.visible = true;
     
  //change the trex animation
  trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     
     if(mousePressedOver(restart)) {
      reset();
     }
   }

  drawSprites();  
}
function reset(){
gameState = PLAY;
  
gameOver.visible = false;
restart.visible = false;
  
//obstaclesGroup.destroyEach();
//cloudsGroup.destroyEach();
  
trex.changeAnimation("running",trex_running);
  
score = 0;  
  
}
function spawnclouds(){
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    //add each cloud to the group
   // cloudsGroup.add(cloud);
  }  

}
function spawnObstacles(){
 if (frameCount % 100 === 0){
  var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
   //obstacle.debug = true
   obstacle.velocityX = -6;
      
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
 }
}