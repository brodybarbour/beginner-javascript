import { convert } from './lib.js';
import { formatCurrency } from './utils.js';
import {fromSelect, toSelect, fromInput, toDisplay} from './elements.js';

async function handleInput(e) {
  const inputData = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );

  toDisplay.textContent = formatCurrency(inputData, toSelect.value);
}

export { handleInput };