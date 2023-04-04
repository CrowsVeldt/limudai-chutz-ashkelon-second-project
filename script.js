// when i click outside the cart, if it is open, it closes
// if an item is already in the cart when i add it, i am asked if i want to add another copy
// if i type a term into the filter box, it changes what products i see


const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
})

const catalogContents = []

const cartContents = []

let cartOpen = false

//need to change display products so i can call it with filtered list
function displayProducts() {
    fetch('catalog.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(entry => {
                productCard(entry)
                catalogContents.push(entry)
            })
        })
}

function displayShoppingCart() {
    if (cartOpen === false) {
        const cart = document.createElement('div')
        cart.id = 'cart'
        cart.className = 'bg-primary'

       cartContents.forEach(item => {
            cart.appendChild(cartItem(item))
        })
        document.body.appendChild(cart)
        cartOpen = true
    } else {
        document.getElementById('cart').remove()
        cartOpen = false
    }
}

function productCard(deetz) {

    const card = document.createElement('div')
    card.className = 'card'
    card.style.width = '18rem'

    const img = document.createElement('img')
    img.className = 'card-img-top'
    img.src = 'res/images/default.jpeg'
    img.alt = 'book'

    const body = document.createElement('div')
    body.className = 'card-body'

    const title = document.createElement('h5')
    title.className = "card-title"
    title.innerHTML = deetz.title

    const author = document.createElement('p')
    author.innerHTML = `by ${deetz.author}`

    const price = document.createElement('p')
    price.className = 'card-text'
    price.innerHTML = priceFormat.format(deetz.pages)

    const addButton = document.createElement('button')
    addButton.className = 'btn btn-primary'
    addButton.innerHTML = 'Add to cart'
    addButton.addEventListener('click', () => {
        addItemToCart(deetz)
    })

    body.appendChild(title)
    body.appendChild(author)
    body.appendChild(price)
    body.appendChild(addButton)
    card.appendChild(img)
    card.appendChild(body)

    document.getElementById('catalog').appendChild(card)
}

function cartItem(deetz) {
    // show all details
    const title = document.createElement('h6')
    title.innerHTML = deetz.title

    return title
}

function addItemToCart(deetz) {
    if (!cartContents.includes(deetz)) {
        cartContents.push(deetz)
    }
}

// function filterProducts () {
// }

displayProducts()