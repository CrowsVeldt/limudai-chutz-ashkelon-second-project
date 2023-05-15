function makeProductCard(deetz) {
    const card = document.createElement('div')
    card.classList.add('card', 'border-secondary')
    card.style.width = '18rem'

    const img = document.createElement('img')
    img.className = 'card-img-top'
    img.src = 'res/images/default.jpeg'
    img.alt = 'book'

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    const title = document.createElement('h5')
    title.className = "card-title"
    title.innerHTML = deetz.title

    const author = document.createElement('p')
    const authorSplit = deetz.author.split(' ')
    const lastName = authorSplit.pop()
    const firstName = authorSplit.length > 0 ? ', '.concat(authorSplit.join(' ')) : ''
    author.innerHTML = `Author: ${lastName}${firstName}`

    const price = document.createElement('p')
    price.className = 'card-text'
    price.innerHTML = priceFormat.format(deetz.pages)

    const addButton = document.createElement('button')
    addButton.classList.add('btn', 'btn-primary', 'cart-focus')
    addButton.innerHTML = 'Add to cart'
    addButton.addEventListener('click', () => {
        addItemToCart(deetz)
    })

    cardBody.appendChild(title)
    cardBody.appendChild(author)
    cardBody.appendChild(price)
    cardBody.appendChild(addButton)
    card.appendChild(img)
    card.appendChild(cardBody)

    document.getElementById('catalog').appendChild(card)
}

function makeCartItem(deetz) {
    const item = document.createElement('div')
    item.classList.add('d-flex', 'flex-column', 'align-items-start', 'shadow-sm', 'cart-focus', 'p-2')

    const title = document.createElement('h6')
    title.innerHTML = deetz.title
    title.className = 'cart-focus'

    const price = document.createElement('p')
    price.innerHTML = priceFormat.format(deetz.pages)
    price.className = 'cart-focus'

    const remove = document.createElement('button')
    remove.innerHTML = 'Remove from cart'
    remove.classList.add('cart-focus', 'btn', 'btn-secondary')
    remove.addEventListener('click', () => {
        removeItemFromCart(deetz)
    })

    item.appendChild(title)
    item.appendChild(price)
    item.appendChild(remove)
    return item
}

function displayShoppingCart() {
    if (document.getElementById('cart')) {
        document.getElementById('cart').remove()
    }
    const cart = document.createElement('div')
    cart.id = 'cart'
    cart.classList.add('bg-light', 'text-center', 'border', 'border-secondary', 'rounded-bottom-2', 'd-flex', 'flex-column', 'pt-1', 'text-dark', 'cart-focus')
    cart.style.overflow = 'scroll'
    cart.style.maxHeight = '90%'

    const checkout = document.createElement('span')
    const checkoutButton = `<button class="btn btn-danger mb-3" onclick="">Go to Checkout</button>`

    const message = document.createElement('h5')
    message.classList.add('cart-focus', 'text-decoration-underline', 'my-3')
    if (localStorage.getItem('cart') != null) {
        let amount = 0
        checkout.style.display = 'inline-block'
        JSON.parse(localStorage.getItem('cart')).forEach(item => {
            amount += item.pages
            message.innerHTML = `Total: ${priceFormat.format(amount)}`
            cart.appendChild(makeCartItem(item))

        })
    } else {
        message.innerHTML = "Nothing here yet!"
        checkout.style.display = 'none'
    }

    cart.appendChild(message)
    checkout.innerHTML = checkoutButton
    cart.appendChild(checkout)
    document.body.appendChild(cart)
}