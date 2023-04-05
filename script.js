// when i click outside the cart, if it is open, it closes
// if an item is already in the cart when i add it, i am asked if i want to add another copy
// if the cart is open when i hit Add to cart I see the new item added to the list
// filter should ignore punctuation in titles
// when the cart is empty it shows a message (e.g. "Nothing here yet!")

const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
})

const catalogContents = []

const cartContents = []

let cartOpen = false

function fetchCatalog() {
    fetch('catalog.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(entry => {
                catalogContents.push(entry)
            })
            displayCatalog(catalogContents.slice(0, 10))
        })

}

function displayShoppingCart() {
    if (cartOpen === false) {
        const cart = document.createElement('div')
        cart.id = 'cart'
        cart.classList.add('bg-primary', 'd-flex', 'flex-column', 'justify-content-center', 'p-1')

        const total = document.createElement('h5')
        let amount = 0

        cartContents.forEach(item => {
            amount += item.pages
            total.innerHTML = `Total: ${priceFormat.format(amount)}`
            cart.appendChild(cartItem(item))
        })

        cart.appendChild(total)
        document.body.appendChild(cart)
        cartOpen = true
    } else {
        document.getElementById('cart').remove()
        cartOpen = false
    }
}

function displayCatalog(list) {
    const cat = document.getElementById('catalog')
    if (cat.hasChildNodes()) {
        cat.innerHTML = ''
    }

    list.forEach(item => productCard(item))
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
    const item = document.createElement('div')
    item.classList.add('d-flex', 'flex-column', 'align-items-center', 'border', 'border-dark')

    const title = document.createElement('h6')
    title.innerHTML = deetz.title

    const price = document.createElement('p')
    price.innerHTML = priceFormat.format(deetz.pages)

    const remove = document.createElement('button')
    remove.innerHTML = 'X'
    remove.addEventListener('click', () => {
        removeItemFromCart(deetz)
    })

    item.appendChild(title)
    item.appendChild(price)
    item.appendChild(remove)
    return item
}

function addItemToCart(deetz) {
    if (!cartContents.includes(deetz)) {
        cartContents.push(deetz)
    }
    displayShoppingCart()
}

function removeItemFromCart(deetz) {
    const index = cartContents.indexOf(deetz)
    if (index >= 0) {
        cartContents.splice(index, 1)
    }
    displayShoppingCart()
}

function filterProducts(input) {
    const term = input.toUpperCase()
    displayCatalog(
        catalogContents.filter(entry => {
            if (entry.title.toUpperCase().includes(term)) {
                return entry
            }
        })
    )
}

fetchCatalog()