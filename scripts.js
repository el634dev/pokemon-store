import data from './data.js'

// Selecting elements from store.html
const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');

// Selecting elements from store.html
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
const addForm = document.getElementById('add-form');

// Selecting elements from learn.html
const searchBtn = document.getElementById('search-btn'); // search button
const inputField = document.getElementById('name-input'); // search field input
const nameScreen = document.getElementById('name-screen'); //name-screen
const imageScreen = document.getElementById('main-screen'); // image screen
const aboutScreen = document.getElementById('about-screen'); // about-text screen
const typeScreen = document.getElementById('type-screen'); // type screen
const idScreen = document.getElementById('id-screen'); // spices screen

//---------------------------------------------------------
for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this changes with each iteration
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
    
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
	// create a paragraph element for a description
	const desc = document.createElement('P')
	// give the paragraph text from the data
	desc.innerText = data[i].desc
	// append the paragraph to the div
	newDiv.appendChild(desc)
	// do the same thing for price
	const price = document.createElement('P')
	price.innerText = data[i].price
	newDiv.appendChild(price)

	// --------------------------------
	// Make a button 
	const button = document.createElement('button')
	// add an  id name to the button
	button.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerText = "Add to Cart"
	newDiv.appendChild(button)
}

// --------------------------
// Create Add to Cart Buttons
const all_items_button = Array.from(document.querySelectorAll("button"));
all_items_button.forEach(elt => elt.addEventListener('click', () => {
	addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
	showItems()
}))

// ------------------------
// Make shopping cart  array
const cart = [];

// -----------------------------------------
// Handle change events when update input is invoked
itemList.onchange = function(e) {
	if (e.target && e.target.classList.contains('update')) {
		const name = e.target.dataset.name;
		const qty = parseInt(e.target.value);
		updateCart(name, qty)
	}
}

// ----------------------------------------
// Handle click in item list
itemList.onclick = function(e) {
	//console.log(e.target)
	if (e.target && e.target.classList.contains('remove')) {
		const name = e.target.dataset.name; // name of date-name
		removeItem(name)
	} else if (e.target && e.target.classList.contains('add-one')) {
		const name = e.target.dataset.name;
		addItem(name)
	} else if (e.target && e.target.classList.contains('remove-one')) {
		const name = e.target.dataset.name;
		removeItem(name, 1)
	}
}

// -----------------------------------
// Handle add submit functionality
addForm.onsubmit = function(e) {
	e.preventDefault()
	const name = itemName.value;
	const price = itemPrice.value;
	addItem(name, price)
}

// -----------------------------------
// Add item to shopping cart
function addItem(name, price) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			cart[i].qty += 1;
			showItems()
			return;
		}
	}
	const item = {name, price, qty: 1};
	cart.push(item)
	showItems()
}

// ----------------------------------------------------
// Show items in cart
function showItems() {
	const qty = getQty();
	cartQty.innerText = `Items in Cart: ${qty}`

	let itemStr = ''
	// Loop through our cart
	for (let i = 0; i < cart.length; i += 1) {
		// console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
		const { name, price, qty } = cart[i];
		
		const itemPrice = qty * price;
		itemStr += `<li>
				${name} $${price} x ${qty} = ${itemPrice.toFixed(2)}
				<button class="add-one" data-name="${name}"> + </button>
				<button class="remove-one" data-name="${name}"> - </button>
			     </li>`
	}
	itemList.innerHTML = itemStr;
	itemList.style.display = "flex";
	itemList.style.alignContent= "center";
	itemList.style.justifyContent= "flex-start";

	const total = getTotal();
	cartTotal.innerText =`Total: $${total.toFixed(2)}`
}

// ------------------------------------------------------------
// Get item/cart quantity
function getQty() {
	// Get the 
	let qty = 0;
	for (let i = 0; i < cart.length; i += 1) {
		qty += cart[i].qty;
	}
	return qty;
}

// -------------------------------------------
// Calculates shopping cart total
function getTotal() {
	let total = 0;
	for (let i = 0; i < cart.length; i += 1) {
		total += cart[i].price * cart[i].qty;
	}
	return total; // can include .toFixed(2) here
}

// ---------------------------------------------
// Remove item from shopping cart
function removeItem(name, qty = 0) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty > 0) {
				cart[i].qty -= qty
			}
			//************* 
			// Edge case if qty is less than 1 or 0 
			if (cart[i].qty < 1 || qty === 0) {
				cart.splice(i, 1)
			}
			showItems()
			return;
		}
	}
}

// ------------------------------------
// Update Cart
function updateCart(name, qty) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty < 1) {
				removeItem(name)
				return
			}
			cart[i].qty = qty
			showItems()
			return;
		}
	}
}

// ----------------
// Test code
// addItem('Apple', 0.99)
// addItem('Apple', 0.99)
// addItem('Orange', 1.29)
// addItem('Orange', 1.29)
// addItem('Orange', 1.29)
// addItem('Frisbee', 9.92)

// showItems()
// removeItem('Apple', 1)
// removeItem('Frisbee')
showItems()

//------------------------------------
// Pokedex Logic
const getPokemonData = (pokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((data) => {
      let id = ('00' + data.id).slice(-3);
      imageScreen.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
      nameScreen.innerText = data.name;
      typeScreen.innerText = data.types[0].type.name;
      idScreen.innerText = `#${data.id}`;
      aboutScreen.innerText = `Height: ${data.height * 10}in Weight: ${
        data.weight / 10
	}lbs`;
      inputField.value = '';
    });
};

inputField.addEventListener ('keydown', (e) => e.key === 'Enter' && searchBtn.click());
searchBtn.addEventListener('click', () => getPokemonData(inputField.value));