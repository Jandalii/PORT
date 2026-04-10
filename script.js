// ===== Loader =====
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    
    // Hide loader after animation completes
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2500);
    
    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';
});

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower has more lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

// ===== Navigation =====
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Scroll effect for navigation
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Greeting based on time =====
const greetingElement = document.querySelector('.greeting span:last-child');
if (greetingElement) {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Good morning!';
    } else if (hour < 17) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }
    
    greetingElement.textContent = greeting;
}

// ===== Projects Slider =====
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevProject');
const nextBtn = document.getElementById('nextProject');
const counterCurrent = document.querySelector('.project-counter .current');
let currentProject = 0;
let isTransitioning = false;

function showProject(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Remove leaving class from all cards first
    projectCards.forEach(card => card.classList.remove('leaving'));
    
    projectCards.forEach((card, i) => {
        if (card.classList.contains('active') && i !== index) {
            // Mark the current active card as leaving
            card.classList.add('leaving');
            setTimeout(() => {
                card.classList.remove('active', 'leaving');
            }, 400);
        }
    });
    
    // Show the new card after a slight delay
    setTimeout(() => {
        projectCards[index].classList.add('active');
        if (counterCurrent) {
            counterCurrent.textContent = String(index + 1).padStart(2, '0');
        }
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }, 100);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        const newIndex = currentProject > 0 ? currentProject - 1 : projectCards.length - 1;
        currentProject = newIndex;
        showProject(currentProject);
    });
    
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        const newIndex = currentProject < projectCards.length - 1 ? currentProject + 1 : 0;
        currentProject = newIndex;
        showProject(currentProject);
    });
}

// Auto-advance projects
setInterval(() => {
    if (!isTransitioning) {
        currentProject = currentProject < projectCards.length - 1 ? currentProject + 1 : 0;
        showProject(currentProject);
    }
}, 5000);

// ===== Skills Animation =====
const skillCategories = document.querySelectorAll('.skill-category');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

skillCategories.forEach(category => {
    skillsObserver.observe(category);
});

// ===== Scroll Animation System =====
const scrollAnimateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-scale, .scroll-animate-left, .scroll-animate-right, .scroll-clip-reveal, .stagger-children');

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

scrollAnimateElements.forEach(el => {
    scrollAnimationObserver.observe(el);
});

// ===== Service Cards Animation =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.2
});

serviceCards.forEach(card => {
    serviceObserver.observe(card);
});

// ===== Smooth Scroll Parallax =====
let ticking = false;

function updateScrollEffects() {
    const scrollY = window.pageYOffset;
    
    // Parallax for images
    document.querySelectorAll('.scroll-reveal-image').forEach(el => {
        const rect = el.getBoundingClientRect();
        const speed = 0.1;
        const yPos = -(rect.top * speed);
        const img = el.querySelector('img');
        if (img && rect.top < window.innerHeight && rect.bottom > 0) {
            img.style.transform = `translateY(${yPos}px) scale(1.05)`;
        }
    });
    
    // Fade out hero on scroll
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        const opacity = 1 - (scrollY / heroHeight) * 1.5;
        const scale = 1 - (scrollY / heroHeight) * 0.1;
        hero.style.opacity = Math.max(0, opacity);
        
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px) scale(${Math.max(0.9, scale)})`;
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// ===== Parallax Effect for Hero Image =====
const heroImage = document.querySelector('.hero-image');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== Scroll-Based Image Reveal =====
const scrollRevealImages = document.querySelectorAll('.scroll-reveal-image');

const imageRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.setAttribute('data-scroll', 'true');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

scrollRevealImages.forEach(img => {
    imageRevealObserver.observe(img);
});

// ===== Hero Image Transition on Scroll =====
const heroImages = document.querySelectorAll('.hero-img');
const progressFill = document.querySelector('.progress-fill');
let currentImageIndex = 0;
let scrollProgress = 0;

if (heroImages.length > 1) {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const heroHeight = heroSection.offsetHeight;
        const scrollInHero = -heroRect.top;
        
        scrollProgress = Math.max(0, Math.min(1, scrollInHero / (heroHeight * 0.8)));
        
        if (progressFill) {
            progressFill.style.width = `${scrollProgress * 100}%`;
        }
        
        const newIndex = scrollProgress > 0.5 ? 1 : 0;
        
        if (newIndex !== currentImageIndex) {
            heroImages[currentImageIndex].classList.add('leaving');
            heroImages[currentImageIndex].classList.remove('active');
            
            setTimeout(() => {
                heroImages.forEach(img => img.classList.remove('leaving'));
            }, 800);
            
            heroImages[newIndex].classList.add('active');
            currentImageIndex = newIndex;
        }
    });
}

// ===== Section Scroll Transitions =====
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== Mouse Movement Parallax =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = hero.getBoundingClientRect();
        
        const x = (clientX - left - width / 2) / 50;
        const y = (clientY - top - height / 2) / 50;
        
        const image = hero.querySelector('.image-container');
        if (image) {
            image.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        const image = hero.querySelector('.image-container');
        if (image) {
            image.style.transform = 'translate(0, 0)';
        }
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Dynamic Year in Footer =====
const yearElements = document.querySelectorAll('[data-year]');
const currentYear = new Date().getFullYear();

yearElements.forEach(el => {
    el.textContent = currentYear;
});

// ===== Magnetic Button Effect =====
const magneticButtons = document.querySelectorAll('.nav-btn, .nav-link.cta');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ===== Text Scramble Effect =====
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ===== Initialize Scramble Effect on Project Titles =====
const projectTitles = document.querySelectorAll('.project-info h3');
projectTitles.forEach(title => {
    const originalText = title.textContent;
    const fx = new TextScramble(title);
    
    title.closest('.project-card')?.addEventListener('mouseenter', () => {
        fx.setText(originalText);
    });
});

// ===== Lazy Loading Images =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== Preload Critical Images =====
const preloadImages = [
    'images/hero-image.png',
    'images/about-image.png'
];

preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// ===== Console Easter Egg =====
console.log(`
%c ABDUL WAHAB JANDALI 
%c Creative Developer & Designer

Looking for the code? Let's connect!

`, 
'color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 0.1em;',
'color: #888888; font-size: 14px;'
);

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Escape to close mobile menu
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
        navToggle?.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Arrow keys for project navigation
    if (e.key === 'ArrowLeft') {
        currentProject = currentProject > 0 ? currentProject - 1 : projectCards.length - 1;
        showProject(currentProject);
    }
    
    if (e.key === 'ArrowRight') {
        currentProject = currentProject < projectCards.length - 1 ? currentProject + 1 : 0;
        showProject(currentProject);
    }
});
