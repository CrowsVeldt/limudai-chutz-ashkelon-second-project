// when i click outside the cart, if it is open, it closes
// if an item is already in the cart when i add it, i am asked if i want to add another copy


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
    // show all details
    const item = document.createElement('div')

    const img = document.createElement('img')
    img.src = 'res/images/default.jpeg'
    img.alt = deetz.title
    img.style.width = '100%'

    const title = document.createElement('h6')
    title.innerHTML = deetz.title

    const price = document.createElement('p')
    price.innerHTML = priceFormat.format(deetz.pages)


    item.appendChild(img)
    item.appendChild(title)
    item.appendChild(price)
    return item
}

function addItemToCart(deetz) {
    if (!cartContents.includes(deetz)) {
        cartContents.push(deetz)
    }
}

function filterProducts(input) {
    // make it ignore punctuation
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