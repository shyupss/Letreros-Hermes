/* IA */
const track = document.querySelector('.carousel-track');
const nextBtn = document.getElementById('right-button');
const prevBtn = document.getElementById('left-button');

let slides = Array.from(document.querySelectorAll('.slide'));
const originalSlidesCount = slides.length;

let index = originalSlidesCount; // empezamos en el bloque real

// 🔁 Clonar TODAS las slides al inicio y al final
slides.forEach(slide => {
    const cloneStart = slide.cloneNode(true);
    const cloneEnd = slide.cloneNode(true);

    track.appendChild(cloneEnd);
    track.insertBefore(cloneStart, track.firstChild);
});

slides = Array.from(document.querySelectorAll('.slide'));

function getSlideWidth() {
    const slide = slides[0];
    const style = window.getComputedStyle(slide);
    const marginRight = parseInt(style.marginRight);
    return slide.offsetWidth + marginRight;
}

function updateCarousel(animate = true) {
    const slideWidth = getSlideWidth();

    track.style.transition = animate
        ? "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)"
        : "none";

    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Posición inicial correcta
updateCarousel(false);

nextBtn.addEventListener('click', () => {
    index++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    index--;
    updateCarousel();
});

track.addEventListener('transitionend', () => {
    if (index >= originalSlidesCount * 2) {
        index = originalSlidesCount;
        updateCarousel(false);
    }

    if (index < originalSlidesCount) {
        index = originalSlidesCount * 2 - 1;
        updateCarousel(false);
    }
});