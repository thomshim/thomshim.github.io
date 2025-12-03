// Project expand/collapse
document.querySelectorAll('.project-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    btn.classList.toggle('active');
  });
});

// Section fade-in on scroll
const sections = document.querySelectorAll('.fade-section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold:0.2 });

sections.forEach(sec => observer.observe(sec));

// Experience expand/collapse
document.querySelectorAll('.experience-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    btn.classList.toggle('active');
  });
});


