// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const fadeElems = document.querySelectorAll('.lab-item, .program-card, .vm-card, .ece-feature');
    
    function checkFade() {
        fadeElems.forEach(elem => {
            const elemTop = elem.getBoundingClientRect().top;
            const elemBottom = elem.getBoundingClientRect().bottom;
            
            if (elemTop < window.innerHeight - 100 && elemBottom > 0) {
                elem.style.opacity = 1;
                elem.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    fadeElems.forEach(elem => {
        elem.style.opacity = 0;
        elem.style.transform = 'translateY(20px)';
        elem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on load and scroll
    checkFade();
    window.addEventListener('scroll', checkFade);
    
    // Gallery slider functionality
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    let galleryIndex = 0;

    function updateGallerySlides() {
        gallerySlides.forEach(slide => {
            slide.classList.remove('active', 'next', 'next2', 'next3');
        });

        gallerySlides[galleryIndex].classList.add('active');
        gallerySlides[(galleryIndex + 1) % gallerySlides.length].classList.add('next');
        gallerySlides[(galleryIndex + 2) % gallerySlides.length].classList.add('next2');
        gallerySlides[(galleryIndex + 3) % gallerySlides.length].classList.add('next3');
    }

    // Auto-slide for gallery
    setInterval(() => {
        galleryIndex = (galleryIndex + 1) % gallerySlides.length;
        updateGallerySlides();
    }, 4000);

    updateGallerySlides();
});