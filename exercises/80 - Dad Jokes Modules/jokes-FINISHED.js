const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

const jokeButton = document.querySelector('.getJoke');
const jokeWrapper = document.querySelector('.joke p');

async function fetchJoke() {
  console.log('fetching data...');

  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: "application/json"
    },
  });

  const data = await response.json();
  return data;
}

async function handleClick() {
  const { joke } = await fetchJoke();
  jokeWrapper.textContent = joke;
  jokeButton.textContent = getItemFromArray(
    buttonText,
    jokeButton.textContent
  );
}

function getItemFromArray(array, not) {
  const item = array[Math.floor(Math.random() * array.length)];
  if (item == not) {
    console.log('We used the same option last time');
    return getItemFromArray(array, not);
  }
  return item;
}

jokeButton.addEventListener('click', handleClick);