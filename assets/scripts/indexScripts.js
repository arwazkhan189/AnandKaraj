// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
        const navbar = document.querySelector('.navbar');
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fade-in on load
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.logo').classList.add('fade-in');
    document.querySelector('.navbar').classList.add('fade-in');
    document.querySelector('.hamburger').classList.add('fade-in');
});

// Fade-in on load
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.logo').classList.add('fade-in');
    document.querySelector('.navbar').classList.add('fade-in');
    document.querySelector('.hamburger').classList.add('fade-in');
    document.querySelector('.logo2-banner img').classList.add('fade-in');
});