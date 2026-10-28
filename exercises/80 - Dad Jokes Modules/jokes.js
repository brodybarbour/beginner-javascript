import { jokeButton } from './lib/elements.js';
import { handleClick } from './lib/handlers.js';

jokeButton.addEventListener('click', handleClick);

console.log('working');