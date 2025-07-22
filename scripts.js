// JavaScript for multiple slideshows on the gallery page

document.addEventListener('DOMContentLoaded', () => {
    const slideshows = {};

    // Initialize all slideshows
    document.querySelectorAll('.slideshow-container').forEach(container => {
        const id = container.getAttribute('data-slideshow');
        slideshows[id] = {
            container: container,
            slides: container.querySelectorAll('.slide'),
            currentIndex: 0
        };
        // Explicitly add active class to first slide
        if (slideshows[id].slides.length > 0) {
            slideshows[id].slides[0].classList.add('active');
        }
        showSlide(id, 0);
    });

    // Show slide by index for a given slideshow
    function showSlide(id, index) {
        const slideshow = slideshows[id];
        if (!slideshow) return;
        const slides = slideshow.slides;
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        slideshow.currentIndex = index;
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    // Event delegation for prev/next buttons
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('prev') || e.target.classList.contains('next')) {
            const id = e.target.getAttribute('data-slideshow');
            if (!id || !slideshows[id]) return;
            const slideshow = slideshows[id];   
            if (e.target.classList.contains('prev')) {
                showSlide(id, slideshow.currentIndex - 1);
            } else {
                showSlide(id, slideshow.currentIndex + 1);
            }
        }
    });
});
