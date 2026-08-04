// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(faqItem => {
      faqItem.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ===== INTERACTIVE MOUSE SPOTLIGHT & CURSOR FOLLOWER =====
document.addEventListener('DOMContentLoaded', () => {
  // Create follower elements dynamically
  const glowFollower = document.createElement('div');
  glowFollower.className = 'mouse-glow-follower';
  document.body.appendChild(glowFollower);

  const mouseRing = document.createElement('div');
  mouseRing.className = 'mouse-glow-ring';
  document.body.appendChild(mouseRing);

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    glowFollower.style.opacity = '1';
    glowFollower.style.left = `${mouseX}px`;
    glowFollower.style.top = `${mouseY}px`;
  });

  window.addEventListener('mouseleave', () => {
    glowFollower.style.opacity = '0';
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    mouseRing.style.left = `${ringX}px`;
    mouseRing.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover animations on tech cards, buttons, links
  const interactiveElements = document.querySelectorAll('a, button, .tech-card, .faq-header, .bento-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      mouseRing.style.width = '46px';
      mouseRing.style.height = '46px';
      mouseRing.style.borderColor = '#C28E68';
      mouseRing.style.backgroundColor = 'rgba(194, 142, 104, 0.12)';
    });

    el.addEventListener('mouseleave', () => {
      mouseRing.style.width = '28px';
      mouseRing.style.height = '28px';
      mouseRing.style.borderColor = 'rgba(194, 142, 104, 0.6)';
      mouseRing.style.backgroundColor = 'transparent';
    });
  });
});
