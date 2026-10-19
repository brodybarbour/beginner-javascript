const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toDisplay = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
// const endpoint = "https://api.frankfurter.dev/v2/rates"; // THIS IS WHAT IS CLOSE
const endpoint = `https://api.apilayer.com/exchangerates_data/latest`
const proxy = 'https://cors-anywhere.herokuapp.com/';
// const proxy = 'https://proxy.cors.sh/';
// const endpoint = `${proxy}https://currency-mcp.wesbos.com/sse`;
const ratesByBase = {};

const myHeaders = new Headers();
myHeaders.append("apikey", "0Grx4PAzIiKzFaq1YxN3Cuk3qltCtEdl");
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
      `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`)
    .join("");
}

async function fetchRates(base = 'USD') {
  try {
    const response = await fetch(`${endpoint}?base=${base}`, requestOptions);
    const rates = await response.json();
    console.log(rates);
    return rates;
  } catch(err) {
    console.log('There was an error fetching the api', err);
  }
}

async function convert(amount, from, to) {
  // first check if we have the rates to convert from that currency
  if (!ratesByBase[from]) {
    console.log(`we don't have ${from} to convert it to ${to}, so let's get it`);
    // if it we don't have value cached, grab it
    const rates = await fetchRates(from);
    // store the value:
    ratesByBase[from] = rates;
    console.log(ratesByBase[from]);
  }

  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}

async function handleInput(e) {
  const inputData = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  )

  toDisplay.textContent = formatCurrency(inputData, toSelect.value);
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat("en-US", {
    style: 'currency',
    currency
  }).format(amount);
}


const optionsHTML = generateOptions(currencies);
// populate the options elements:
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;
form.addEventListener('input', handleInput);