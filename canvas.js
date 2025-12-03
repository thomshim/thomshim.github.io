  // Canvas Animation
    const canvas = document.getElementById('leftCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];
    const particleCount = 1500;
    const mouse = { x: null, y: null, radius: 150 };

    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    offCtx.fillStyle = 'white';
    offCtx.font = 'bold 100px Inter, sans-serif';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText('Thomas', canvas.width / 2, canvas.height / 2 - 50);
    offCtx.fillText('Shimer', canvas.width / 2, canvas.height / 2 + 50);

    const textData = offCtx.getImageData(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particleCount; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let targetX, targetY;
      
      while(true) {
        let tx = Math.floor(Math.random() * canvas.width);
        let ty = Math.floor(Math.random() * canvas.height);
        let idx = (ty * canvas.width + tx) * 4;
        if(textData.data[idx + 3] > 128) {
          targetX = tx;
          targetY = ty;
          break;
        }
      }
      
      particles.push({
        x, y,
        tx: targetX,
        ty: targetY,
        r: 1.5 + Math.random() * 1.5,
        dx: 0,
        dy: 0
      });
    }

    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        let dx = p.tx - p.x;
        let dy = p.ty - p.y;
        
        // Mouse repulsion
        if(mouse.x !== null && mouse.y !== null) {
          let mdx = mouse.x - p.x;
          let mdy = mouse.y - p.y;
          let dist = Math.sqrt(mdx * mdx + mdy * mdy);
          
          if(dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            dx -= (mdx / dist) * force * 50;
            dy -= (mdy / dist) * force * 50;
          }
        }
        
        p.dx = dx * 0.005;
        p.dy = dy * 0.005;
        p.x += p.dx;
        p.y += p.dy;
        
        // Gradient color based on position
        let hue = (p.x / canvas.width) * 60 + 180;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    animate();

    // Scroll Progress
    window.addEventListener('scroll', () => {
      const rightPanel = document.querySelector('.right-panel');
      const scrollHeight = rightPanel.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      document.getElementById('scrollProgress').style.width = scrolled + '%';
    });

    // Intersection Observer for fade-in
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-section').forEach(section => {
      observer.observe(section);
    });

    // Project expandable
    document.querySelectorAll('.project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const isActive = btn.classList.contains('active');
        
        document.querySelectorAll('.project-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.project-content').forEach(c => c.style.maxHeight = null);
        
        if(!isActive) {
          btn.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    // Resize handler
    window.addEventListener('resize', () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      offCtx.fillStyle = 'white';
      offCtx.font = 'bold 100px Inter, sans-serif';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText('Thomas', canvas.width / 2, canvas.height / 2 - 50);
      offCtx.fillText('Shimer', canvas.width / 2, canvas.height / 2 + 50);
    });