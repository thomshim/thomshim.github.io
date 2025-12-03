const canvas = document.getElementById('leftCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let particles = [];
const particleCount = 1500; // adjust for density


const offCanvas = document.createElement('canvas');
const offCtx = offCanvas.getContext('2d');
offCanvas.width = canvas.width;
offCanvas.height = canvas.height;

offCtx.fillStyle = 'white';
offCtx.font = 'bold 100px Inter';
offCtx.textAlign = 'center';
offCtx.textBaseline = 'middle';


offCtx.fillText('Thomas', canvas.width / 2, canvas.height / 2 - 50);


offCtx.fillText('Shimer', canvas.width / 2, canvas.height / 2 + 50);


const textData = offCtx.getImageData(0, 0, canvas.width, canvas.height);


for(let i=0;i<particleCount;i++){
  let x = Math.random()*canvas.width;
  let y = Math.random()*canvas.height;

  let targetX, targetY;
  while(true){
    let tx = Math.floor(Math.random()*canvas.width);
    let ty = Math.floor(Math.random()*canvas.height);
    let idx = (ty*canvas.width + tx)*4;
    if(textData.data[idx+3] > 128){ // alpha > 128
      targetX = tx;
      targetY = ty;
      break;
    }
  }

  particles.push({
    x, y,
    tx: targetX,
    ty: targetY,
    r: 1.5 + Math.random()*1.5,
    dx: 0,
    dy: 0
  });
}

// Animation loop
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    // move a fraction toward target
    p.dx = (p.tx - p.x)*0.005;
    p.dy = (p.ty - p.y)*0.005;
    p.x += p.dx;
    p.y += p.dy;

    // draw particle
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = '#00aaff';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

animate();

// Resize
window.addEventListener('resize', ()=>{
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  // Redraw text on offscreen canvas
  offCanvas.width = canvas.width;
  offCanvas.height = canvas.height;
  offCtx.fillStyle = 'white';
  offCtx.font = 'bold 120px Inter';
  offCtx.textAlign = 'center';
  offCtx.textBaseline = 'middle';
  offCtx.fillText('Thomas', canvas.width / 2, canvas.height / 2);
});
