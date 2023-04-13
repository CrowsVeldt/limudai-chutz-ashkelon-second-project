// show ten items at a time?
// with buttons to show next/previous ten?



const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
})

const catalogContents = []

const cartContents = []

document.addEventListener('click', (event) => {
    if (document.getElementById('cart')) {
        if (!event.target.classList.contains('cart-focus')) {
            toggleCart()
        }
    }
})

function fetchCatalog() {
    fetch('catalog.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(entry => {
                catalogContents.push(entry)
            })
            // showing only ten items for ease of development
            // displayCatalog(catalogContents.slice(0, 10))
            displayCatalog(catalogContents)
        })

}

function toggleCart() {
    if (document.getElementById('cart')) {
        document.getElementById('cart').remove()
    } else {
        displayShoppingCart()
    }
}

function displayShoppingCart() {
    if (document.getElementById('cart')) {
        document.getElementById('cart').remove()
    }
    const cart = document.createElement('div')
    cart.id = 'cart'
    cart.classList.add('bg-light', 'text-center', 'border', 'border-secondary', 'd-flex', 'flex-column', 'justify-content-center', 'p-1', 'text-dark', 'cart-focus')

    if (cartContents.length === 0) {
        const message = document.createElement('h5')
        message.classList.add('cart-focus', 'text-decoration-underline')
        message.innerHTML = "Nothing here yet!"

        cart.appendChild(message)
    } else {
        const total = document.createElement('h5')
        total.classList.add('cart-focus', 'text-decoration-underline')
        let amount = 0

        cartContents.forEach(item => {
            amount += item.pages
            total.innerHTML = `Total: ${priceFormat.format(amount)}`
            cart.appendChild(makeCartItem(item))
        })

        cart.appendChild(total)
    }

    document.body.appendChild(cart)

}

function displayCatalog(list) {
    const cat = document.getElementById('catalog')
    if (cat.hasChildNodes()) {
        cat.innerHTML = ''
    }

    list.forEach(item => makeProductCard(item))
}

function makeProductCard(deetz) {

    const card = document.createElement('div')
    card.classList.add('card', 'border-secondary')
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
    addButton.classList.add('btn', 'btn-primary', 'cart-focus')
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

function makeCartItem(deetz) {
    const item = document.createElement('div')
    item.classList.add('d-flex', 'flex-column', 'align-items-center', 'border', 'border-secondary', 'cart-focus')

    const title = document.createElement('h6')
    title.innerHTML = deetz.title
    title.className = 'cart-focus'

    const price = document.createElement('p')
    price.innerHTML = priceFormat.format(deetz.pages)
    price.className = 'cart-focus'

    const remove = document.createElement('button')
    remove.innerHTML = 'X'
    remove.className = 'cart-focus'
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
        showToast(`Added ${deetz.title} to cart`)
    }
    if (document.getElementById('cart')) {
        displayShoppingCart()
    }
}

function removeItemFromCart(deetz) {
    const index = cartContents.indexOf(deetz)
    if (index >= 0) {
        cartContents.splice(index, 1)
        showToast(`Removed ${deetz.title} from cart`)
        displayShoppingCart()
    }
}

function showToast(message) {
    const toast = document.createElement('div')
    toast.classList.add('myToast', 'rounded-pill', 'p-2', 'bg-primary', 'text-light', 'border', 'border-dark')

    const toastMessage = document.createElement('p')
    toastMessage.innerHTML = message

    toast.appendChild(toastMessage)
    document.body.appendChild(toast)

    setTimeout(() => {
        const target = document.getElementsByClassName('myToast')
        target[0].remove(target)
    }, 1250)
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