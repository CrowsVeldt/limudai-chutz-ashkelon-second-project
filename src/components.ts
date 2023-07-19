import { 
    priceFormat, 
    BookDetails, 
    getStoredData,
    SortMethod, 
    sortMethodList } from './util.js'
import { 
    removeItemFromCheckout,
    removeItemFromCart, 
    addItemToCart, 
    displayCatalog, 
    toggleCheckout} from './index.js'

function makeProductCard(deetz: BookDetails): HTMLDivElement {
    const card: HTMLDivElement = document.createElement('div')
    card.classList.add('card', 'border-secondary')
    card.style.width = '18rem'

    const img: HTMLImageElement = document.createElement('img')
    img.className = 'card-img-top'
    img.src = 'res/images/default.jpeg'
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

function makeShoppingCart(): HTMLDivElement {
    const storedCartData: BookDetails[] = getStoredData('cart')
    const cart: HTMLDivElement = document.createElement('div')
    cart.id = 'cart'
    cart.classList.add('bg-light', 'text-center', 'border', 'border-secondary', 'rounded-bottom-2', 'd-flex', 'flex-column', 'pt-1', 'text-dark', 'cart-focus')
    cart.style.overflow = 'scroll'
    cart.style.maxHeight = '90%'

    const checkoutSpan: HTMLSpanElement = document.createElement('span')
    const checkoutButton: HTMLButtonElement = document.createElement('button')
    checkoutButton.innerText = 'Go to checkout'
    checkoutButton.classList.add('btn', 'btn-danger', 'mb-3', 'checkout-focus')
    checkoutButton.addEventListener('click', () => {
        toggleCheckout()
    })

    const message: HTMLHeadingElement = document.createElement('h5')
    message.classList.add('cart-focus', 'text-decoration-underline', 'my-3')
    if (storedCartData.length > 0) {
        let price: number = 0
        storedCartData.forEach((item: BookDetails) => {
            price += item.pages
            message.innerHTML = `Total: ${priceFormat.format(price)}`
            cart.appendChild(makeCartItem(item))

        })
        checkoutSpan.style.display = 'inline-block'
    } else {
        message.innerHTML = "Nothing here yet!"
        checkoutSpan.style.display = 'none'
    }

    cart.appendChild(message)
    checkoutSpan.appendChild(checkoutButton)
    cart.appendChild(checkoutSpan)
    return cart
}

function makeCheckoutItem(deetz: BookDetails): HTMLDivElement {
    const item: HTMLDivElement = document.createElement('div')
    item.classList.add('text-center', 'row', 'w-100', 'checkout-focus', 'border-bottom', 'py-2')

    const title: HTMLParagraphElement = document.createElement('p')
    title.innerHTML = deetz.title
    title.classList.add('checkout-focus', 'col', 'mb-0')

    const price: HTMLParagraphElement = document.createElement('p')
    price.innerHTML = priceFormat.format(deetz.pages)
    price.classList.add('checkout-focus', 'col', 'mb-0')

    const remove: HTMLButtonElement = document.createElement('button')
    remove.innerText = 'x'
    remove.classList.add('checkout-focus', 'col', 'checkout-remove-button')

    remove.addEventListener('click', () => {
        removeItemFromCheckout(deetz.title)
    })

    item.appendChild(title)
    item.appendChild(price)
    item.appendChild(remove)
    return item
}

function makeCheckoutPage(): HTMLDivElement {

    const checkout: HTMLDivElement = document.createElement('div')
    checkout.id = 'checkout'
    checkout.classList.add('checkout-focus', 'container')

    const topPanel: HTMLDivElement = document.createElement('div')
    topPanel.id = 'top-panel'
    topPanel.classList.add('checkout-focus')

    const bottomPanel: HTMLDivElement = document.createElement('div')
    bottomPanel.id = 'bottom-panel'
    bottomPanel.classList.add('checkout-focus', 'd-flex', 'flex-column', 'text-center')

    const purchaseList: HTMLDivElement = document.createElement('div')
    purchaseList.id = 'purchase-list'
    purchaseList.classList.add('checkout-focus', 'container', 'align-center')

    const message: HTMLHeadingElement = document.createElement('h2')
    message.id = 'checkout-total'
    message.classList.add('checkout-focus', 'my-1')

    const purchaseButton: HTMLButtonElement = document.createElement('button')
    purchaseButton.id = 'purchase-button'
    purchaseButton.classList.add('checkout-focus', 'btn', 'btn-success', 'mb-2')
    purchaseButton.innerText = 'Buy now!'

    const cart: BookDetails[] = getStoredData('cart')
    if (cart.length > 0) {
        let amount: number = 0
        cart.forEach((item: BookDetails) => {
            amount += item.pages
            message.innerHTML = `Total: ${priceFormat.format(amount)}`
            purchaseList.append(makeCheckoutItem(item))
        })
    } else {
        purchaseButton.style.display = 'none'
        message.innerHTML = "Nothing here yet!"
    }

    topPanel.appendChild(purchaseList)
    bottomPanel.appendChild(message)
    bottomPanel.appendChild(purchaseButton)
    checkout.appendChild(topPanel)
    checkout.appendChild(bottomPanel)

    return checkout
}

function makeSortDropdownItem(method: SortMethod): HTMLLIElement {
    const item: HTMLLIElement = document.createElement('li')

    const button: HTMLButtonElement = document.createElement('button')
    button.classList.add('dropdown-item')
    button.type = 'button'
    button.innerText = method.title
    button.addEventListener('click', () => {
        displayCatalog(undefined, method.method)
    })

    item.appendChild(button)
    return item
}

function makeSortDropdownList(): HTMLLIElement[]{
    const sort: HTMLUListElement | null = document.querySelector('#sort')
    let list: HTMLLIElement[] = []

    if (sort) {
        list = sortMethodList.map((method: SortMethod) => {
            return makeSortDropdownItem(method)
        })
    }
    return list
}

function showToast(message: string): void {
    const toast: HTMLDivElement = document.createElement('div')
    toast.classList.add('my-toast', 'rounded-pill', 'px-2', 'pt-3', 'bg-primary', 'text-light', 'border', 'border-dark')

    const toastMessage: HTMLParagraphElement = document.createElement('p')
    toastMessage.innerHTML = message

    toast.appendChild(toastMessage)
    document.body.appendChild(toast)

    setTimeout(() => {
        document.querySelectorAll('.my-toast')[0].remove()
    }, 1250)
}

export { 
    makeCartItem, 
    makeCheckoutPage,
    makeProductCard, 
    makeSortDropdownList, 
    makeShoppingCart,
    showToast }