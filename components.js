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

    item.innerHTML = `<h6 class="cart-focus">${deetz.title}</h6>
                    <p class="cart-focus">${priceFormat.format(deetz.pages)}</p>`

    const remove = document.createElement('button')
    remove.innerHTML = 'Remove from cart'
    remove.classList.add('cart-focus', 'btn', 'btn-secondary')
    remove.addEventListener('click', () => {
        removeItemFromCart(deetz.title)
    })

    item.appendChild(remove)
    return item
}

function showToast(message) {
    const toast = document.createElement('div')
    toast.classList.add('my-toast', 'rounded-pill', 'px-2', 'pt-3', 'bg-primary', 'text-light', 'border', 'border-dark')

    const toastMessage = document.createElement('p')
    toastMessage.innerHTML = message

    toast.appendChild(toastMessage)
    document.body.appendChild(toast)

    setTimeout(() => {
        const target = document.getElementsByClassName('my-toast')
        target[0].remove(target)
    }, 1250)
}

function makeCheckoutPage () {
    const checkout = document.createElement('div')
    checkout.id = 'checkout-page'
    checkout.style.display = 'block'
    checkout.classList.add('rounded', 'checkout-focus')

    const message = document.createElement('h2')

    if (localStorage.getItem('cart') != null) {
        let amount = 0
        JSON.parse(localStorage.getItem('cart')).forEach(item => {
            amount += item.pages
            message.innerHTML = `Total: ${priceFormat.format(amount)}`
            // checkout.appendChild(makeCartItem(item))
        })
    } else {
        message.innerHTML = "Nothing here yet!"
    }

    checkout.appendChild(message)
    document.body.appendChild(checkout)
}

