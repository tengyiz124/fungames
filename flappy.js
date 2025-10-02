const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

let bird = {x:50,y:150,r:14,vy:0};
let gravity=0.5, lift=-9;
let pipes = [], pipeW=56, gap=140, frame=0;
let score=0, over=false;

document.addEventListener('keydown', e=>{
  if(['Space','ArrowUp','KeyW'].includes(e.code)){
    if(over) restart();
    else bird.vy = lift;
  }
});

function spawnPipe(){
  const top = 40 + Math.random()*(canvas.height - gap - 120);
  pipes.push({x:canvas.width, top, bottom: canvas.height - top - gap, passed:false});
}

function update(){
  if(over) { drawGameOver(); return; }
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // bird
  bird.vy += gravity; 
  bird.y += bird.vy;
  ctx.beginPath(); 
  ctx.arc(bird.x,bird.y,bird.r,0,Math.PI*2); 
  ctx.fillStyle='gold'; 
  ctx.fill(); 
  ctx.stroke();

  // pipes
  if(frame % 90 === 0) spawnPipe();
  for(let i=pipes.length-1;i>=0;i--){
    let p = pipes[i]; 
    p.x -= 2;

    // draw pipes
    ctx.fillStyle='green';
    ctx.fillRect(p.x,0,pipeW,p.top);
    ctx.fillRect(p.x,canvas.height - p.bottom, pipeW, p.bottom);

    // score
    if(!p.passed && p.x + pipeW < bird.x){ 
      score++; 
      document.getElementById('score').innerText = score; 
      p.passed = true; 
    }

    // collision
    if(bird.x+bird.r>p.x && bird.x-bird.r<p.x+pipeW && 
      (bird.y-bird.r<p.top || bird.y+bird.r>canvas.height-p.bottom)) 
      over = true;

    if(p.x + pipeW < 0) pipes.splice(i,1);
  }

  // floor / ceiling
  if(bird.y + bird.r > canvas.height) over = true;
  if(bird.y - bird.r < 0){ bird.y = bird.r; bird.vy = 0; }

  frame++;
  if(!over) requestAnimationFrame(update);
}

function drawGameOver(){
  ctx.fillStyle='rgba(0,0,0,0.5)'; 
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='white'; 
  ctx.font='36px Arial'; 
  ctx.textAlign='center';
  ctx.fillText('Game Over', canvas.width/2, canvas.height/2 - 10);
  ctx.font='20px Arial'; 
  ctx.fillText('Press Space to Restart', canvas.width/2, canvas.height/2 + 24);
}

function restart(){
  bird={x:50,y:150,r:14,vy:0}; 
  pipes=[]; 
  frame=0; 
  score=0; 
  over=false;
  document.getElementById('score').innerText = 0;
  update();
}

update();
