// Smooth scroll functionality
document.querySelectorAll('[data-section]').forEach(element => {
    element.addEventListener('click', function() {
        const targetId = this.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    
    // Reset form
    this.reset();
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and gallery items
document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add active state to nav on scroll
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

//Slider


document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const slides = Array.from(document.querySelectorAll(".slider-card"));

  // duplicate slides for seamless loop
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  let position = 0;
  let speed = 0.5; // adjust speed in pixels per frame (higher = faster)
  let animationFrame;

  function smoothAutoScroll() {
    position -= speed;

    // when we've scrolled past half the total width, reset to start
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }

    // apply transform directly in pixels for precision
    track.style.transform = `translateX(${position}px)`;
    animationFrame = requestAnimationFrame(smoothAutoScroll);
  }

  function startAutoScroll() {
    cancelAnimationFrame(animationFrame);
    smoothAutoScroll();
  }

  startAutoScroll();
});


// Add interactive paper effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add slight tilt effect based on mouse position
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
        
        // Add paper rustle sound effect (visual feedback)
        card.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.top = '0';
            ripple.style.left = '0';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.opacity = '0';
            ripple.style.transition = 'opacity 0.5s ease';
            ripple.style.zIndex = '0';
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                ripple.style.opacity = '0';
                setTimeout(() => ripple.remove(), 500);
            }, 300);
        });
        
        // Slight rotation animation on load
        const randomDelay = Math.random() * 300;
        setTimeout(() => {
            card.style.animation = 'paperFloat 0.6s ease-out';
        }, randomDelay);
    });
});

// Add CSS animation for paper float effect
const style = document.createElement('style');
style.textContent = `
    @keyframes paperFloat {
        0% {
            transform: translateY(20px) rotateX(-5deg);
            opacity: 0;
        }
        100% {
            transform: translateY(0) rotateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);