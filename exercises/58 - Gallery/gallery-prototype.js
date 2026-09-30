function Gallery(gallery) {
    if (!gallery) {
        throw new Error('No gallery found');
    }

    this.gallery = gallery;
    // select the elements we need
    // to keep images scoped to each gallery, declare these variables inside
    this.images = Array.from(gallery.querySelectorAll('img'));
    this.modal = document.querySelector('.modal');
    this.prevButton = this.modal.querySelector('.prev');
    this.nextButton = this.modal.querySelector('.next');

    // bind our methods to the instance when we need them
    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    //event listeners:
    this.images.forEach(image =>
        image.addEventListener('click', event => this.showImage(event.currentTarget))
    );

    // function handleImageClick(event) {
    //     showImage(event.currentTarget);
    // }
    // images.forEach(image => image.addEventListener('click', handleImageClick))

    // Listen for user tabbing and hitting enter instead of click:
    // Loop over all images
    this.images.forEach(image => {
        //attach an event listener to each image:
        image.addEventListener('keyup', event => {
            // check if keyup is enter
            if (event.key === 'Enter') {
                this.showImage(event.currentTarget);
            }
        });
    });

    this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function () {
    // check if the modal is already open:
    if (this.modal.matches('.open')) {
        return;
    }
    // if not open, add class to display modal
    this.modal.classList.add('open');

    // Event listeners bound when modal is open
    window.addEventListener('keyup', this.handleKeyUp);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function() {
    this.modal.classList.remove('open');
    window.removeEventListener("keyup", this.handleKeyUp);
    this.nextButton.removeEventListener("click", this.showNextImage);
    this.prevButton.removeEventListener("click", this.showPrevImage);
}

Gallery.prototype.handleClickOutside = function(event) {
    if (event.target === event.currentTarget) {
        this.closeModal();
    }
}

Gallery.prototype.handleKeyUp = function(event) {
    if (event.key === 'Escape') {
        this.closeModal();
        return;
    }
    if (event.key === 'ArrowRight') {
        this.showNextImage();
        return;
    }
    if (event.key === 'ArrowLeft') {
        this.showPrevImage();
        return;
    }
}

Gallery.prototype.showNextImage = function() {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
}

Gallery.prototype.showPrevImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
}

Gallery.prototype.showImage = function(el) {
    if (!el) {
        console.info('no image to show');
        return;
    }
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();
}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);