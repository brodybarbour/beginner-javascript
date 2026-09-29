function Gallery(gallery) {
    if (!gallery) {
        throw new Error('No gallery found');
    }

    // select the elements we need
    // to keep images scoped to each gallery, declare these variables inside
    const images = Array.from(gallery.querySelectorAll('img'));
    // use document here since there is a single modal shared between galleries:
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    function openModal() {
        // check if the modal is already open:
        if (modal.matches('.open')) {
            return;
        }
        // if not open, add class to display modal
        modal.classList.add('open');
        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);
    }

    function closeModal() {
        modal.classList.remove('open');
        window.removeEventListener("keyup", handleKeyUp);
        nextButton.removeEventListener("click", showNextImage);
    }

    function handleClickOutside(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    function handleKeyUp(event) {
        if (event.key === 'Escape') {
            closeModal();
            return;
        }
        if (event.key === 'ArrowRight') {
            showNextImage();
            return;
        }
        if (event.key === 'ArrowLeft') {
            showPrevImage();
            return;
        }
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function showImage(el) {
        if (!el) {
            console.info('no image to show');
            return;
        }
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }

    // function handleImageClick(event) {
    //     showImage(event.currentTarget);
    // }

    // images.forEach(image => image.addEventListener('click', handleImageClick))

    //event listeners:
    images.forEach(image => image.addEventListener('click', (event) => showImage(event.currentTarget)));

    // Listen for user tabbing and hitting enter instead of click:
    // Loop over all images
    images.forEach((image) => {
        //attach an event listener to each image:
        image.addEventListener('keyup', (event) => {
            // check if keyup is enter
            if (event.key === 'Enter') {
                showImage(event.currentTarget);
            }
        });
    });

    modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));