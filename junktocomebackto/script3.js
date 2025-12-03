document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

// PROJECT / EXPERIENCE TOGGLE
document.querySelectorAll('.project, .experience-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// PARTICLE BACKGROUND
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let particles = [];

class Particle {
  constructor() {
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.vx = (Math.random()-0.5)*0.1;
    this.vy = (Math.random()-0.5)*0.1;
    this.size = Math.random()*2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if(this.x<0||this.x>w) this.vx*=-1;
    if(this.y<0||this.y>h) this.vy*=-1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0,255,198,0.05)';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

for(let i=0;i<60;i++) particles.push(new Particle());

function animate(){
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0,0,w,h);
  particles.forEach(p=>{p.update(); p.draw();});
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x;
      const dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<150){
        ctx.strokeStyle=`rgba(0,255,198,${0.005*(1-dist/150)})`;
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});
