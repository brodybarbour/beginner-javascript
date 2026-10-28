const ratesByBase = {};
const endpoint = `https://api.apilayer.com/exchangerates_data/latest`;

const myHeaders = new Headers();
myHeaders.append("apikey", "0Grx4PAzIiKzFaq1YxN3Cuk3qltCtEdl");
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

async function fetchRates(base = 'USD') {
    try {
        const response = await fetch(`${endpoint}?base=${base}`, requestOptions);
        const rates = await response.json();
        console.log(rates);
        return rates;
    } catch (err) {
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


export { fetchRates, convert }