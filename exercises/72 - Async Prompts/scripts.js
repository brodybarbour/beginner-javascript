function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
    popup.classList.remove('open');
    // wait until class is removed and element fades out using css
    await wait(1000);
    // remove popup entirely
    popup.remove();
    popup = null;
}

function ask(options) {
    return new Promise(async (resolve) => {
        // First we need to create a popup with all the fields in it
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML(
            "afterbegin", `
                <fieldset>
                    <label>${options.title}</label>
                    <input type="text" name="input" />
                    <button type="submit">Submit</button>
                </fieldset>
            `
        );
        console.log(popup);

        // check if they want a cancel button
        if (options.cancel) {
            const skipButton = document.createElement('button');
            skipButton.type = 'button';
            skipButton.textContent = 'Cancel';
            popup.firstElementChild.appendChild(skipButton);
            //TODO: Listen for a click on the cancel button
            skipButton.addEventListener('click', function() {
                resolve(null);
                destroyPopup(popup);
            }, {once: true})
        }

        // listen for the submit event on the inputs
        popup.addEventListener("submit", function(event) {
            event.preventDefault();
            resolve(event.target.input.value);
            // remove popup from the dom entirely:
            destroyPopup(popup);
        }, {once: true});

        // when someone does submit it, resolve the data that was in the input box!

        // insert that popup into the DOM
        document.body.appendChild(popup);

        // put a very small timeout before we add the open class so fadein css class works
        await wait(50);
        popup.classList.add('open');
    });
}

// select all buttons that have a question:
async function askQuestion(event) {
    const button = event.currentTarget;
    const cancel = 'cancel' in button.dataset;
    const answer = await ask({
        title: button.dataset.question,
        cancel,
    });
    console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

const questions = [
    { title: 'What is your name?' },
    { title: 'What is your age?', cancel: true },
    { title: 'What is your dogs name?' },
];

async function asyncMap(array, callback) {
    // make an array to store results:
    const results = [];
    // loop over our array
    for (const item of array) {
        const result = await callback(item);
        results.push(result);
    }
    // when done the loop, return it:
    return results;
}

async function go() {
    const answers = await asyncMap(questions, ask);
    console.log(answers);
}

go();