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

export { fetchJoke };