import { fetchJoke } from './index.js';
import { jokeButton, jokeWrapper } from './elements.js';
import { buttonText } from '../data/buttonText.js';
import { getItemFromArray } from './utils.js';

export async function handleClick() {
  const { joke } = await fetchJoke();
  jokeWrapper.textContent = joke;
  jokeButton.textContent = getItemFromArray(
    buttonText,
    jokeButton.textContent
  );
}

// return {handleClick}