var ghost, ghostImage1, ghostImage2;
var railings, railingsImage, railingsGroup;
var tower, towerImage;
var doors, doorsImage, doorsGroup;
var invisibleBlockGroup;
var spookySound;

var gameState= "PLAY";

function preload(){
  towerImage= loadImage("tower.png");
  
  ghostImage1= loadImage("ghost-standing.png");
  
  railingsImage= loadImage("climber.png");

  doorsImage= loadImage("door.png");
  
  spookySound= loadSound("spooky.wav");
}

function setup(){
  createCanvas(600, 600);
  
  tower= createSprite(300, 300, 20, 20);
  tower.addImage(towerImage);
  
  ghost= createSprite(150, 150, 20, 20);
  ghost.addImage(ghostImage1);
  ghost.scale= 0.3;
  ghost.setCollider("circle", 0, 0, 100);
  ghost.debug= true;
  
  doorsGroup= new Group();
  railingsGroup= new Group();
  invisibleBlockGroup= new Group();
  
}

function draw(){
  tower.velocityY= 1;
  spookySound.loop();
  
  if(gameState === "PLAY"){
    if(keyDown("left")){
      ghost.x= ghost.x - 4;
    }
    
    if(keyDown("right")){
      ghost.x= ghost.x + 4;
    }
    
    if(tower.y > 400){
      tower.y= 300;
    }
         
    if(keyDown("space")){
      ghost.velocityY= -8
    }
    
    ghost.velocityY= ghost.velocityY + 0.8
    
  
    spawnDoors_and_Railings();
    
    if(railingsGroup.isTouching(ghost)){
      ghost.velocityY= 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y >= 600){
      ghost.destroy();
      doorsGroup.destroyEach();
      railingsGroup.destroyEach();
      gameState= "END";
      
      tower.visible= false;
      
      background("black");
      
      fill("yellow");
      textSize(30);
      text("Game is Over", 150, 200);
    }
    
  }
  
  drawSprites();
}

function spawnDoors_and_Railings(){
  if(frameCount % 240 === 0){
    doors= createSprite(200, 50);
    doors.addImage(doorsImage);
    doors.lifetime= 800;
    doors.velocityY= 1;
    
    doors.x= Math.round(random(120, 400));
    
    railings= createSprite(doors.x, doors.y+80);
    railings.addImage(railingsImage);
    railings.lifetime= 800;
    railings.velocityY= 1;
    
    var invisibleBlock= createSprite(200, 15);
    invisibleBlock.x= doors.x;
    invisibleBlock.width= railings.width;
    invisibleBlock.height= 2;
    invisibleBlock.visible= false;
    invisibleBlock.velocityY= 1;
    
    ghost.depth= doors.depth;
    
    ghost.depth += 1
    
    doorsGroup.add(doors);
    railingsGroup.add(railings);
    invisibleBlockGroup.add(invisibleBlock)
  }
}