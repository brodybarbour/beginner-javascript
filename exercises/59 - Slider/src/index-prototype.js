
function Slider(slider) {
    if (!(slider instanceof Element)) {
        throw new Error('No slider passed in');
    }

    // select the elements needed for the slider
    this.slides = slider.querySelector('.slides');
    this.slider = slider;
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');

    // when slider is created, run these functions:
    this.startSlider();
    this.applyClasses();

    //event listeners:
    prevButton.addEventListener('click', () => this.move('back'));
    nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function() {
    this.current = this.slider.querySelector('.current') || this.slides.firstElementChild;
    this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
    this.next = this.current.nextElementSibling || this.slides.firstElementChild;
}

Slider.prototype.applyClasses = function() {
    this.current.classList.add('current');
    this.prev.classList.add('prev');
    this.next.classList.add('next');
}

Slider.prototype.move = function(direction) {
    // strip off all current classes from slides:
    const classesToRemove = ['prev', 'current', 'next'];
    this.prev.classList.remove(...classesToRemove);
    this.current.classList.remove(...classesToRemove);
    this.next.classList.remove(...classesToRemove);

    if (direction === 'back') {
        // make an array of the new values and destructure them over and into the prev, current, and next variables:
        [this.prev, this.current, this.next] = [this.prev.previousElementSibling || this.slides.lastElementChild, this.prev, this.current];
    } else /*direction is forward */ {
        [this.prev, this.current, this.next] = [this.current, this.next, this.next.nextElementSibling || this.slides.firstElementChild]
    }

    this.applyClasses();
}

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));