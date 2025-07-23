document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Dark/Light Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
// Form Validation with Real-Time Error Clearing
const form = document.getElementById('contactForm');

// Real-time validation with instant error clearing
document.getElementById('fullName').addEventListener('input', function() {
    if (validateName()) {
        clearError('fullName', 'nameError');
    }
});

document.getElementById('emailAddress').addEventListener('input', function() {
    if (validateEmail()) {
        clearError('emailAddress', 'emailError');
    }
});

document.getElementById('subjectLine').addEventListener('input', function() {
    if (validateSubject()) {
        clearError('subjectLine', 'subjectError');
    }
});

document.getElementById('messageContent').addEventListener('input', function() {
    if (validateMessage()) {
        clearError('messageContent', 'messageError');
    }
});

// Enhanced validation functions that return true/false
function validateName() {
    const name = document.getElementById('fullName').value.trim();
    const nameError = document.getElementById('nameError');
    const nameRegex = /^[A-Za-z\s]+$/;
    
    if (!name) {
        showError('fullName', nameError, 'Name is required');
        return false;
    }
    
    if (!nameRegex.test(name)) {
        showError('fullName', nameError, 'Only letters and spaces allowed');
        return false;
    }
    
    if (name.length < 3) {
        showError('fullName', nameError, 'Name must be at least 3 characters');
        return false;
    }
    
    return true;
}

function validateEmail() {
    const email = document.getElementById('emailAddress').value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError('emailAddress', emailError, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError('emailAddress', emailError, 'Please enter a valid email');
        return false;
    }
    
    return true;
}

function validateSubject() {
    const subject = document.getElementById('subjectLine').value.trim();
    const subjectError = document.getElementById('subjectError');
    
    if (!subject) {
        showError('subjectLine', subjectError, 'Subject is required');
        return false;
    }
    
    if (subject.length < 5) {
        showError('subjectLine', subjectError, 'Subject must be at least 5 characters');
        return false;
    }
    
    return true;
}

function validateMessage() {
    const message = document.getElementById('messageContent').value.trim();
    const messageError = document.getElementById('messageError');
    
    if (!message) {
        showError('messageContent', messageError, 'Message is required');
        return false;
    }
    
    if (message.length < 10) {
        showError('messageContent', messageError, 'Message must be at least 10 characters');
        return false;
    }
    
    return true;
}

// Helper functions
function showError(fieldId, errorElement, message) {
    document.getElementById(fieldId).classList.add('error');
    errorElement.textContent = message;
}

function clearError(fieldId, errorElementId) {
    document.getElementById(fieldId).classList.remove('error');
    document.getElementById(errorElementId).textContent = '';
}

function clearErrors() {
    // Clear all error styles and messages
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.textContent = '';
    });
    
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = '';
    formStatus.className = '';
}

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const formStatus = document.getElementById('formStatus');
        const submitBtn = document.getElementById('submitBtn');
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'success';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            formStatus.textContent = 'Oops! There was a problem sending your message.';
            formStatus.className = 'error';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }
});

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.hero-text, .hero-image, .about-image, .about-text, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Initialize elements as invisible
    document.querySelectorAll('.hero-text, .hero-image, .about-image, .about-text, .contact-info, .contact-form').forEach(element => {
        element.style.opacity = '0';
        if (element.classList.contains('hero-text') || element.classList.contains('about-image') || element.classList.contains('contact-info')) {
            element.style.transform = 'translateX(-50px)';
        } else {
            element.style.transform = 'translateX(50px)';
        }
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

