// Mobile Navigation
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

// Toggle mobile menu
function toggleMenu() {
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    menuBtn.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

menuBtn.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.querySelectorAll('.news-card, .testimonial-card, .plan-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Sample Events Data
const events = [
    {
        title: 'Football Championship',
        date: '2024-06-15',
        location: 'Central Stadium',
        image: 'images/match.jpg'
    },
    {
        title: 'Basketball Tournament',
        date: '2024-07-01',
        location: 'Sports Arena',
        image: 'images/match.jpg'
    },
    {
        title: 'Volleyball League',
        date: '2024-07-15',
        location: 'Beach Court',
        image: 'images/match.jpg'
    }
];

// Populate Events
const eventsSlider = document.querySelector('.events-slider');
events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <h3>${event.title}</h3>
        <p><i class="fas fa-calendar"></i> ${event.date}</p>
        <p><i class="fas fa-location-dot"></i> ${event.location}</p>
    `;
    eventsSlider.appendChild(eventCard);
});

// Sample Gallery Images
const galleryImages = [
    'images/gallery.jpg',
    'images/gallery.jpg',
    'images/gallery.jpg',
    'images/gallery.jpg',
    'images/gallery.jpg',
    'images/gallery.jpg'
];

// Populate Gallery
const galleryGrid = document.querySelector('.gallery-grid');
galleryImages.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `<img src="${image}" alt="Sports Gallery Image">`;
    galleryGrid.appendChild(galleryItem);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            input.classList.remove('error');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    let isValid = true;
    formInputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields');
        return;
    }

    // Email validation
    const emailInput = contactForm.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add('error');
        alert('Please enter a valid email address');
        return;
    }

    // Success
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
    formInputs.forEach(input => input.classList.remove('error'));
});

// Add some additional styles dynamically
const style = document.createElement('style');
style.textContent = `
    .event-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        margin: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .event-card:hover {
        transform: translateY(-5px);
    }

    .event-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .event-card h3 {
        padding: 1rem;
        margin: 0;
    }

    .event-card p {
        padding: 0 1rem 1rem;
        color: var(--light-text);
    }

    .events-slider {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        cursor: pointer;
    }

    .gallery-item img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .gallery-item:hover img {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
