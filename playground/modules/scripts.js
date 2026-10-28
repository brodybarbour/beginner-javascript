import { returnHi as sayHi } from './utils.js';
import * as everything from "./wes.js";
import { handleButtonClick } from './handlers.js';
// import brody from "./wes.js";
const button = document.querySelector('button');

button.addEventListener('click', handleButtonClick);

// const name = "brody";
// console.log(sayHi(name));
// console.log(everything);