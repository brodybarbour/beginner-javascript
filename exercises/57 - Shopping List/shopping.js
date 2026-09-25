// Grab elements we'll be interacting with
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// array to hold state.
// State is data that reflects the state of application.
/* In this example, state is going to contain a list of
all our items, a list of the item IDs, and whether they have
been checked off or not.

if we imagine this as a shopping cart, state would be a list of
items in the cart, how many of each item was in the cart and how
expensive each item was.
*/
// Items is our state in this example:
let items = [];

// listen for when someone types into the input and hits the submit button
function handleSubmit(e) {
    e.preventDefault(); // Prevents form submit from adding string into url
    const itemName = e.currentTarget.item.value;
    if (!itemName) return; //if the itemName variable is false/doesn't exist, return

    const item = {
        name: itemName,
        id: Date.now(), //This works to set a unique id as long as there's only 1/milisecond
        complete: false,
    }
    items.push(item); // Pushes each item entered in the input into the 'Items' array
    // console.log(`There are now ${items.length} in your state`);
    e.target.reset(); // Resets the form input
    displayItems();
    list.dispatchEvent(new CustomEvent('itemsUpdated')); //listening on the list variable for any interaction. When an iteraction happens, we want to dispatch and event, and fire a new custom event called itemUpdated
}

function displayItems() {
    const html = items.map(
        (item) => `<li class="shopping-item">
        <input
            type="checkbox"
            value="${item.id}"
            ${item.complete ? 'checked' : ''}
        >
        <span class="item-name">${item.name}</span>
        <button
            aria-label="Remove ${item.name} from checklist"
            value="${item.id}"
        >&times;</button>
        </li>`
    )
    .join(''); //join makes one single string, rather than array of strings
    list.innerHTML = html //puts contents of html variable into html markup
}

//stores what's in array to localstorage
function mirrorToLocalStorage(){
    console.info('saving items to localstorage');
    localStorage.setItem('items', JSON.stringify(items)); //convert object to string so localstorage can read it.
}

// grabs string that's stored locally and puts it into the items array
// helps keep info on page if it's reloaded
function restoreFromLocalStorage() {
    console.log('Restoring from local storage');
    const lsItems = JSON.parse(localStorage.getItem('items')); //convert string back to object
    if (lsItems.length) {
        // items = lsItems; //can't set the value since items is a const
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItem(id) {
    console.log("DELETING ITEM!!!!");
    console.log(id);
    items = items.filter(item => item.id !== id); //adds all items BUT matched id clicked into the items array.
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
    //The reason we called it itemRef because if we change a value on the object, it will be reflected in the array of items. So we can update the value of the item's complete property easily.
    const itemReference = items.find((item) => item.id === id);
    //setting the value like this will work because the opposite of true is false and vice versa. Thus, setting it to the bang version of itself should work.
    itemReference.complete = !itemReference.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Event listeners:
shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
list.addEventListener('click', function(e) {
    // set an id variable and parse so we can use same id
    const id = parseInt(e.target.value);

    // listen for if delete button is clicked
    if (e.target.matches('button')) {
        deleteItem(id); //parseInt
    }

    // listen for if checkbox is checked
    if (e.target.matches('input[type="checkbox"]')); {
        markAsComplete(id);
    }
});
restoreFromLocalStorage();
// list.addEventListener('itemsUpdated', displayItems); //listening for the registered custom event