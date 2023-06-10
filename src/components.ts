function makeProductCard(deetz: BookDetails): HTMLDivElement {
    const card: HTMLDivElement = document.createElement('div')
    card.classList.add('card', 'border-secondary')
    card.style.width = '18rem'

    const img: HTMLImageElement = document.createElement('img')
    img.className = 'card-img-top'
    img.src = '../res/images/default.jpeg'
    img.alt = 'book'

    const cardBody: HTMLDivElement = document.createElement('div')
    cardBody.className = 'card-body'

    const title: HTMLHeadingElement = document.createElement('h5')
    title.className = "card-title"
    title.innerHTML = deetz.title

    const author: HTMLParagraphElement = document.createElement('p')
    const authorSplit: string[] = deetz.author.split(' ')
    const lastName: string | undefined = authorSplit.pop()
    const firstName: string = authorSplit.length > 0 ? ', '.concat(authorSplit.join(' ')) : ''
    author.innerHTML = `Author: ${lastName}${firstName}`

    const price: HTMLParagraphElement = document.createElement('p')
    price.className = 'card-text'
    price.innerHTML = priceFormat.format(deetz.pages)

    const addButton: HTMLButtonElement = document.createElement('button')
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
    
    return card
}

function makeCartItem(deetz: BookDetails): HTMLDivElement {
    const item: HTMLDivElement = document.createElement('div')
    item.classList.add('d-flex', 'flex-column', 'align-items-start', 'shadow-sm', 'cart-focus', 'p-2')

    item.innerHTML = `<h6 class="cart-focus">${deetz.title}</h6>
                    <p class="cart-focus">${priceFormat.format(deetz.pages)}</p>`

    const remove: HTMLButtonElement = document.createElement('button')
    remove.innerHTML = 'Remove from cart'
    remove.classList.add('cart-focus', 'btn', 'btn-secondary')
    remove.addEventListener('click', () => {
        removeItemFromCart(deetz.title)
    })

    item.appendChild(remove)
    return item
}

function makeCheckoutItem(deetz: BookDetails): HTMLDivElement {
    const item: HTMLDivElement = document.createElement('div')
    item.classList.add('d-flex', 'justify-content-between', 'text-start', 'w-100', 'checkout-focus')

    const title: HTMLParagraphElement = document.createElement('p')
    title.innerHTML = deetz.title
    title.classList.add('checkout-focus')

    const price: HTMLParagraphElement = document.createElement('p')
    price.innerHTML = priceFormat.format(deetz.pages)
    price.classList.add('checkout-focus')

    item.appendChild(title)
    item.appendChild(price)
    return item
}

function makeCheckoutPage(): HTMLDivElement {

    const checkout: HTMLDivElement = document.createElement('div')
    const topPanel: HTMLDivElement = document.createElement('div')
    topPanel.classList.add('checkout-focus')
    const bottomPanel: HTMLDivElement = document.createElement('div')
    bottomPanel.classList.add('checkout-focus', 'd-flex', 'space-between')

    const purchaseList: HTMLDivElement = document.createElement('div')

    const message: HTMLHeadingElement = document.createElement('h2')
    message.classList.add('ms-5', 'checkout-focus')

    const purchaseButton: HTMLButtonElement = document.createElement('button')
    purchaseButton.classList.add('checkout-focus', 'btn', 'btn-success')
    purchaseButton.innerText = 'Buy now!'

    const cart: BookDetails[] = getStoredData('cart')
    if (cart) {
        let amount: number = 0
        cart.forEach((item: BookDetails) => {
            amount += item.pages
            message.innerHTML = `Total: ${priceFormat.format(amount)}`
            purchaseList.append(makeCheckoutItem(item))
        })
    } else {
        message.innerHTML = "Nothing here yet!"
    }

    topPanel.appendChild(purchaseList)
    bottomPanel.appendChild(message)
    bottomPanel.appendChild(purchaseButton)
    checkout.appendChild(topPanel)
    checkout.appendChild(bottomPanel)

    return checkout
}

function showToast(message: string): void {
    const toast: HTMLDivElement = document.createElement('div')
    toast.classList.add('my-toast', 'rounded-pill', 'px-2', 'pt-3', 'bg-primary', 'text-light', 'border', 'border-dark')

    const toastMessage: HTMLParagraphElement = document.createElement('p')
    toastMessage.innerHTML = message

    toast.appendChild(toastMessage)
    document.body.appendChild(toast)

    setTimeout(() => {
        document.getElementsByClassName('my-toast')[0].remove()
    }, 1250)
}