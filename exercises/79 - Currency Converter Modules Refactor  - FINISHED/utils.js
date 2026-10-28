function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
      `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`)
    .join("");
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat("en-US", {
    style: 'currency',
    currency
  }).format(amount);
}

export { generateOptions, formatCurrency };