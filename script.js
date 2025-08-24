// Good Luck Interior - JavaScript Functionality
// Author: Professional Web Developer
// Date: 2025

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VIDEO GALLERY FUNCTIONALITY =====
    const videoItems = document.querySelectorAll('.video-item');
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const closeModal = document.querySelector('.close-modal');
    
    // Open video modal when clicking on a video item
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video-url');
            videoFrame.src = videoUrl;
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close video modal when clicking on close button
    closeModal.addEventListener('click', function() {
        closeVideoModal();
    });
    
    // Close video modal when clicking outside of modal content
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Close video modal when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
    
    // Function to close video modal
    function closeVideoModal() {
        videoModal.style.display = 'none';
        videoFrame.src = ''; // Stop video playback
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // ===== MOBILE NAVIGATION =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ===== STICKY NAVIGATION =====
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== TESTIMONIAL SLIDER =====
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all testimonials and dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    // Function to show previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // ===== RATING SYSTEM =====
    const ratingForm = document.querySelector('.rating-form');
    const ratingInputs = ratingForm.querySelectorAll('input[type="radio"]');
    const ratingName = document.getElementById('ratingName');
    const ratingComment = document.getElementById('ratingComment');
    const submitRatingBtn = document.querySelector('.submit-rating-btn');
    const overallRating = document.querySelector('.overall-rating');

    // Rating data storage (in real app, this would be in a database)
    let ratings = [
        { rating: 5, count: 20 },
        { rating: 4, count: 3 },
        { rating: 3, count: 1 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 }
    ];

    // Update rating display
    function updateRatingDisplay() {
        const totalRatings = ratings.reduce((sum, item) => sum + item.count, 0);
        const averageRating = totalRatings > 0 ? 
            (ratings.reduce((sum, item) => sum + (item.rating * item.count), 0) / totalRatings).toFixed(1) : 0;
        
        // Update average rating number
        document.querySelector('.rating-number').textContent = averageRating;
        
        // Update total ratings text
        document.querySelector('.total-ratings').textContent = `Based on ${totalRatings} ratings`;
        
        // Update rating bars
        const bars = document.querySelectorAll('.rating-bar .bar');
        const counts = document.querySelectorAll('.rating-bar span:last-child');
        
        ratings.forEach((item, index) => {
            const percentage = totalRatings > 0 ? (item.count / totalRatings) * 100 : 0;
            bars[index].style.width = percentage + '%';
            counts[index].textContent = item.count;
        });
    }

    // Submit rating
    submitRatingBtn.addEventListener('click', function() {
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        const name = ratingName.value.trim();
        const comment = ratingComment.value.trim();
        
        if (!selectedRating) {
            alert('Please select a rating');
            return;
        }
        
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        if (!comment) {
            alert('Please enter a comment');
            return;
        }
        
        // Add new rating
        const ratingValue = parseInt(selectedRating.value);
        ratings[5 - ratingValue].count++;
        
        // Update display
        updateRatingDisplay();
        
        // Show success message
        this.textContent = 'Rating Submitted!';
        this.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        
        // Reset form
        ratingForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            this.textContent = 'Submit Rating';
            this.style.background = 'linear-gradient(45deg, #D4AF37, #B8860B)';
        }, 3000);
        
        // Add new testimonial to the slider
        addNewTestimonial(name, comment, ratingValue);
    });

    // Add new testimonial to slider
    function addNewTestimonial(name, comment, rating) {
        const testimonialsSlider = document.querySelector('.testimonials-slider');
        const newTestimonial = document.createElement('div');
        newTestimonial.className = 'testimonial';
        
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        
        newTestimonial.innerHTML = `
            <div class="testimonial-content">
                <div class="stars">
                    ${Array(rating).fill('<i class="fas fa-star"></i>').join('')}
                    ${Array(5 - rating).fill('<i class="far fa-star"></i>').join('')}
                </div>
                <p>"${comment}"</p>
                <div class="client-info">
                    <h4>${name}</h4>
                    <span>New Client</span>
                </div>
            </div>
        `;
        
        testimonialsSlider.appendChild(newTestimonial);
        
        // Update dots
        const dotsContainer = document.querySelector('.testimonial-dots');
        const newDot = document.createElement('span');
        newDot.className = 'dot';
        newDot.setAttribute('data-slide', testimonials.length);
        dotsContainer.appendChild(newDot);
        
        // Update testimonials array
        testimonials.push(newTestimonial);
        dots.push(newDot);
        
        // Add click event to new dot
        newDot.addEventListener('click', () => showSlide(testimonials.length - 1));
    }

    // Initialize rating display
    updateRatingDisplay();

    // Enhanced rating visualization
    function createRatingChart() {
        const bars = document.querySelectorAll('.rating-bar .bar');
        bars.forEach((bar, index) => {
            const currentWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = currentWidth;
            }, index * 200);
        });
    }

    // Create rating chart on page load
    setTimeout(createRatingChart, 1000);

    // ===== PORTFOLIO FILTERING & LIGHTBOX =====
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Portfolio filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Open lightbox when clicking on portfolio item
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', closeLightboxFunc);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightboxFunc();
        }
    });

    function closeLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            contactForm.reset();
        }
    });

    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + 'Error');
        
        clearError(field);
        
        // Required field validation
        if (!value) {
            showError(field, errorElement, `${getFieldDisplayName(fieldName)} is required`);
            return false;
        }
        
        // Email validation
        if (fieldName === 'email' && !isValidEmail(value)) {
            showError(field, errorElement, 'Please enter a valid email address');
            return false;
        }
        
        // Phone validation
        if (fieldName === 'phone' && !isValidPhone(value)) {
            showError(field, errorElement, 'Please enter a valid phone number');
            return false;
        }
        
        // Name validation
        if (fieldName === 'name' && value.length < 2) {
            showError(field, errorElement, 'Name must be at least 2 characters long');
            return false;
        }
        
        // Message validation
        if (fieldName === 'message' && value.length < 10) {
            showError(field, errorElement, 'Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }

    // Show error message
    function showError(field, errorElement, message) {
        field.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Clear error message
    function clearError(field) {
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.style.borderColor = '#e0e0e0';
        errorElement.style.display = 'none';
    }

    // Get field display name
    function getFieldDisplayName(fieldName) {
        const names = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            message: 'Message'
        };
        return names[fieldName] || fieldName;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Show success message
    function showSuccessMessage() {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(45deg, #D4AF37, #B8860B)';
        }, 3000);
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content, .testimonial, .rating-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Simple hero content animation
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #D4AF37, #B8860B);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects for scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
    });

    // ===== FLOATING CONTACT WIDGET =====
    const floatingContact = document.querySelector('.floating-contact');
    const floatingContactToggle = document.querySelector('.floating-contact-toggle');
    const closeFloatingContact = document.querySelector('.close-floating-contact');

    floatingContactToggle.addEventListener('click', function() {
        floatingContact.classList.toggle('active');
    });

    closeFloatingContact.addEventListener('click', function() {
        floatingContact.classList.remove('active');
    });

    // Close floating contact when clicking outside
    document.addEventListener('click', function(e) {
        if (!floatingContact.contains(e.target)) {
            floatingContact.classList.remove('active');
        }
    });

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        // Hide loading screen
        const loadingScreen = document.querySelector('.loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
        
        document.body.classList.add('loaded');
        
        // Add fade-in animation to hero content
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Keyboard navigation for portfolio items
    portfolioItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View project details');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Focus management for lightbox
    lightbox.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    console.log('Good Luck Interior website loaded successfully! 🎨✨');
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target, duration) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // Override smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollPolyfill(target, 1000);
            }
        });
    });
}
