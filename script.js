const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
})

const catalogContents = []

const cartContents = []

let cartOpen = false

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
        const cartContainer = document.createElement('div')
        cartContainer.id = 'cartContainer'

        cartContents.forEach(item => {
            cartContainer.appendChild(cartItem(item))
        })
        document.getElementById('nav').appendChild(cartContainer)
        cartOpen = true
    } else {
        document.getElementById('cartContainer').remove()
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
    body.appendChild(price)
    body.appendChild(addButton)
    card.appendChild(img)
    card.appendChild(body)

    document.getElementById('catalog').appendChild(card)
}

function cartItem (deetz) {
    const title = document.createElement('h6')
    title.innerHTML = deetz.title

    return title
}

function addItemToCart(deetz) {
    cartContents.push(deetz)
}

displayProducts()