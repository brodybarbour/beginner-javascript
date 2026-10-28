const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toDisplay = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
const ratesByBase = {};

const endpoint = `https://api.apilayer.com/exchangerates_data/latest`
const proxy = 'https://cors-anywhere.herokuapp.com/';


const optionsHTML = generateOptions(currencies);
// populate the options elements:
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener('input', handleInput);