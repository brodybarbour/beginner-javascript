function getItemFromArray(array, not) {
  const item = array[Math.floor(Math.random() * array.length)];
  if (item == not) {
    console.log('We used the same option last time');
    return getItemFromArray(array, not);
  }
  return item;
}

export { getItemFromArray }