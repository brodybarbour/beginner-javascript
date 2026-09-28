
function Slider(slider) {
    if (!(slider instanceof Element)) {
        throw new Error('No slider passed in');
    }

    // variables for elements that make;
    let current;
    let prev;
    let next;

    // select the elements needed for the slider
    const slides = slider.querySelector('.slides');
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');

    function startSlider() {
        current = slider.querySelector('.current') || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
        console.log({current, prev, next});
    }

    function applyClasses() {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
        console.log({current, prev, next});
    }

    function move(direction) {
        // strip off all current classes from slides:
        // prev.classList.remove("prev", "current", "next");
        // current.classList.remove("prev", "current", "next");
        // next.classList.remove("prev", "current", "next");
        const classesToRemove = ['prev', 'current', 'next'];
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);

        if (direction === 'back') {
            // make an array of the new values and destructure them over and into the prev, current, and next variables:
            [prev, current, next] = [prev.previousElementSibling || slides.lastElementChild, prev, current];
        } else /*direction is forward */ {
            [prev, current, next] = [current, next, next.nextElementSibling || slides.firstElementChild]
        }

        applyClasses();
    }

    // when slider is created, run these functions:
    startSlider();
    applyClasses();

    //event listeners:
    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));