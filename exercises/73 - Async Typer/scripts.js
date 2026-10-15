function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomNumber(min = 20, max = 150, randomNumber = Math.random()) {
    return Math.floor(randomNumber * (max - min) + min);
}

// async function draw(el) {
//     const text = el.textContent;
//     let soFar = '';

//     for (const letter of text) {
//         soFar += letter;
//         const { typeMin, typeMax } = el.dataset;
//         const amountOfTimeToWait = getRandomNumber(typeMin, typeMax);
//         await wait(amountOfTimeToWait);
//     }
// }

// recursion method:
// Recursion refers to this concept of a function calling itself until there is some sort of exit condition that tells it to stop.
function draw(el) {
    let index = 1;
    const text = el.textContent;
    const { typeMin, typeMax } = el.dataset;

    async function drawLetter() {
        el.textContent = text.slice(0, index);
        index += 1;

        //exit condition
        await wait(getRandomNumber(typeMin, typeMax));
        if (index <= text.length) {
            drawLetter();
        }
    }

    drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);