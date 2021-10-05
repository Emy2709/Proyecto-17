//Estados del Juego
  var PLAY=1;
  var END=0;
  var gameState=1;

  var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position,tabla,marcador;
  var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,tablaImage,marcadorImage, knifeSound,off,ouchImage;

function preload(){
  
  knifeImage = loadImage("cuchillo.png");
  monsterImage = loadAnimation("dedo1.png","dedo2.png")
  fruit1 = loadImage("fruta1.png");
  fruit2 = loadImage("fruta2.png");
  fruit3 = loadImage("fruta3.png");
  fruit4 = loadImage("fruta4.png");
  gameOverImage = loadImage("gameover.png");
  tablaImage = loadImage("tabla.jpg");
  knifeSound =loadSound("soundKnife.wav");
  off=loadSound("off.mp3");
  ouchImage=loadImage("ouch.png");
//carga aquí el sonido
}



function setup() {
  createCanvas(600, 380);
  tabla=createSprite(300,190,20,20);
  tabla.addImage(tablaImage);
  tabla.scale=0.6;
  
  marcador=createSprite (500,30,20,20);
  marcador.addImage(fruit4);
  marcador.scale=0.15;
  
  
//crea la espada/cuchillo
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.3
  
//establece la colisión para el cuchillo
  knife.setCollider("rectangle",0,0,40,40);

//Puntuación de Variables y Grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Llama la función de frutas y Monstruo
  fruits();
  Monster();
    
//Mueve la espada/cuchillo con el ratón
  knife.y=World.mouseY;
  knife.x=World.mouseX;
  
    //Incrementa la puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){
  fruitGroup.destroyEach();
  score=score+2;
  knifeSound.play();
    }
  else
    {
// Ve al estado del juego: end, si el cuchillo toca al enemigo
  if(monsterGroup.isTouching(knife)){
  gameState=END;
  off.play();
        
//agrega aquí el sonido de fin del juego
        
  fruitGroup.destroyEach();
  monsterGroup.destroyEach();
  fruitGroup.setVelocityXEach(0);
  monsterGroup.setVelocityXEach(0);
        
// Cambia la animación de la espada a gameover y reinicia su posición
  knife.addImage(gameOverImage);
  knife.scale=2;
  knife.x=300;
  knife.y=300;
  ouch=createSprite(300,200);
  ouch.addImage(ouchImage);
  ouch.scale=0.5;
      }
    }
  }
  
  drawSprites();
  //Muestra la puntuación
  
  textSize(25);
  text("X "+ score,520,40,fill("yellow"));
}


function Monster(){
  if(World.frameCount%100===0){
  monster=createSprite(600,380,20,20);
  monster.addAnimation("moving", monsterImage);
  monster.y=Math.round(random(50,550));
    //actualiza a continuación la línea de código para incrementar la velocidad de monsterGroup en 10
  monster.velocityX = -(8+(score/10));
  monster.setLifetime=50;
  monster.scale = 0.3;
    
  monsterGroup.add(monster);
    
  }
}

function fruits(){
  if(World.frameCount%50===0){
  position = Math.round(random(1,2));
  fruit=createSprite(400,200,20,20);
    
     //utilizando la variable aleatoria, cambia la posición de la fruta para hacerlo más desafiante
    
    if(position==1)
    {
  fruit.x=600;
    //actualiza a continuación la línea de código para incrementar la velocidad de fruitGroup en 4
  fruit.velocityX=-(7+(score/4))
    }
  else
    {
    if(position==2){
      fruit.x=0;
      
//actualiza a continuación la línea de código para incrementar la velocidad de fruitGroup en 7
  fruit.velocityX= (7+(score/4));
      }
    }
    
  fruit.scale=0.2;
    
//fruit.debug=true;
    
  r=Math.round(random(1,4));
    if (r == 1) {
  fruit.addImage(fruit1);
    } else if (r == 2) {
  fruit.addImage(fruit2);
    } else if (r == 3) {
  fruit.addImage(fruit3);
    } else {
  fruit.addImage(fruit4);
    }
    
  fruit.y=Math.round(random(50,550));
   
    
  fruit.setLifetime=100;
    
  fruitGroup.add(fruit);
  }
}