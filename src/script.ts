// make checkoutItem function to populate checkout
// show translation of lorem ipsum on hover (comes out gibberish, looks ugly)

const priceFormat: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
})

document.addEventListener('DOMContentLoaded', (event) => {
    updateCartNumber()
    fetchCatalog()
})

// Close shopping cart if click outside of it
document.addEventListener('click', (event) => {
    if (document.getElementById('cart')) {
        if (!event.target.classList.contains('cart-focus')) {
            toggleCart()
        }
    }

    // close checkout page if click outside of it
    if (document.getElementById('checkout-page').style.display !== 'none') {
        if (!event.target.classList.contains('checkout-focus')) {
            toggleCheckout()
        }
    }

    // if filter dropdown is open fade out catalog
    const dropButton: HTMLElement | null = document.getElementById('dropdown-button')
    const cards: HTMLCollection = document.getElementsByClassName('card')
    if (dropButton.ariaExpanded === 'true') {

        for (let i = 0; i < cards.length; i++) {
            cards[i].style.opacity = '0.5'
            // cards[i].style.filter = 'blur(3px)'
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.opacity = '1'
            // cards[i].style.filter = ''
        }
    }
})

function fetchCatalog(): void {
    let catalog: object[] = []
    if (localStorage.length === 0) {
        fetch('../catalog.json')
            .then(response => response.json())
            .then(data => {
                data.forEach((entry: object) => {
                    catalog.push(entry)
                })
                localStorage.setItem('catalog', JSON.stringify(catalog))
                // For developement:
                // displayCatalog(catalog.slice(0, 10))
                displayCatalog(catalog)
            })
    } else {
        const storedCat: object[] = JSON.parse(localStorage.getItem('catalog'))
        storedCat.forEach(key => {
            if (key != null) {
                catalog.push(key)
            }
        })
        // For developement:
        // displayCatalog(catalog.slice(0, 10))
        displayCatalog(catalog)
    }
}

function toggleCart(): void {
    const cartElement: HTMLElement | null = document.getElementById('cart')
    if (cartElement) {
        cartElement.remove()
    } else {
        displayShoppingCart()
    }
}

function toggleCheckout() {
    const checkout: HTMLElement | null = document.getElementById('checkout-page')
    const children: HTMLCollection = document.body.children

    if (checkout.style.display !== 'none') {
        checkout.style.display = 'none'
        checkout.innerHTML = ''
        for (let child in children) {
            if (typeof children[child] === 'object' && !children[child].classList.contains('checkout-focus')) {
                children[child].style.filter = ''
            }
        }
    } else {
        checkout.style.display = 'flex'
        for (let child in children) {
            if (typeof children[child] === 'object' && !children[child].classList.contains('checkout-focus')) {
                children[child].style.filter = 'blur(5px)'
            }
        }
        makeCheckoutPage()
    }
}

function displayCatalog(list: object[] = JSON.parse(localStorage.getItem('catalog')), 
                        sortMethod? : string): void {
    const catalog = document.getElementById('catalog')
    if (catalog.hasChildNodes()) {
        catalog.innerHTML = ''
    }
    list.sort(sortCatalogBy(sortMethod)).forEach((item: object) => makeProductCard(item))
}

function displayShoppingCart() {
    if (document.getElementById('cart')) {
        document.getElementById('cart').remove()
    }
    const cart: HTMLDivElement = document.createElement('div')
    cart.id = 'cart'
    cart.classList.add('bg-light', 'text-center', 'border', 'border-secondary', 'rounded-bottom-2', 'd-flex', 'flex-column', 'pt-1', 'text-dark', 'cart-focus')
    cart.style.overflow = 'scroll'
    cart.style.maxHeight = '90%'

    const checkout: HTMLSpanElement = document.createElement('span')
    const checkoutButton: string = `<button class="btn btn-danger mb-3 checkout-focus" onclick="toggleCheckout()">Go to Checkout</button>`

    const message: HTMLHeadingElement = document.createElement('h5')
    message.classList.add('cart-focus', 'text-decoration-underline', 'my-3')
    if (localStorage.getItem('cart') != null) {
        let price = 0
        JSON.parse(localStorage.getItem('cart')).forEach(item => {
            price += item.pages
            message.innerHTML = `Total: ${priceFormat.format(price)}`
            cart.appendChild(makeCartItem(item))

        })
        checkout.style.display = 'inline-block'
    } else {
        message.innerHTML = "Nothing here yet!"
        checkout.style.display = 'none'
    }

    cart.appendChild(message)
    checkout.innerHTML = checkoutButton
    cart.appendChild(checkout)
    document.body.appendChild(cart)
}

type Sort = (a: BookDetails, b: BookDetails) => number;

function sortCatalogBy(method: string = 'titleFirst'): () => void {
    let sortFunction: Sort
    const dropdownButton: HTMLElement | null = document.getElementById('dropdown-button')

    switch (method) {
        case 'priceHigh':
            dropdownButton.innerHTML = 'Highest to Lowest'
            sortFunction = (a: BookDetails, b: BookDetails) => b.pages - a.pages
            break
        case 'priceLow':
            dropdownButton.innerHTML = 'Lowest to Highest'
            sortFunction = (a: BookDetails, b: BookDetails) => a.pages - b.pages
            break
        case 'authorFirst':
            dropdownButton.innerHTML = 'Author: A to Z'
            sortFunction = (a: BookDetails, b: BookDetails) => {
                const aLast = a.author.split(' ').slice(-1)[0]
                const bLast = b.author.split(' ').slice(-1)[0]
                return aLast.localeCompare(bLast)
            }
            break
        case 'authorLast':
            dropdownButton.innerHTML = 'Author: Z to A'
            sortFunction = (a: BookDetails, b: BookDetails) => {
                const aLast = a.author.split(' ').slice(-1)[0]
                const bLast = b.author.split(' ').slice(-1)[0]
                return bLast.localeCompare(aLast)
            }
            break
        case 'titleFirst':
            dropdownButton.innerHTML = 'Title: A to Z'
            sortFunction = (a: BookDetails, b: BookDetails) => a.title.localeCompare(b.title)
            break
        case 'titleLast':
            dropdownButton.innerHTML = 'Title: Z to A'
            sortFunction = (a: BookDetails, b: BookDetails) => b.title.localeCompare(a.title)
            break
        default:
            console.error('no sort method supplied')
    }

    return sortFunction
}

function updateCartNumber(): void {
    const cartNum: HTMLElement| null = document.getElementById('cart-number')
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart != null) {
        const cartLength = cart.length
        cartNum.className = 'round-white-border'
        cartNum.innerHTML = cartLength
    } else {
        cartNum.className = ''
        cartNum.innerHTML = ''
    }
}

function addItemToCart(deetz: BookDetails): void {
    let cart = JSON.parse(localStorage.getItem('cart'))

    if (cart != null) {
        if (!cart.some((e: BookDetails) => e.title === deetz.title)) {
            cart.push(deetz)
            localStorage.setItem('cart', JSON.stringify(cart))
            showToast(`Added ${deetz.title} to cart`)
        }
    } else {
        localStorage.setItem('cart', JSON.stringify([deetz]))
        showToast(`Added ${deetz.title} to cart`)
    }

    if (document.getElementById('cart')) {
        displayShoppingCart()
    }
    updateCartNumber()
}

function removeItemFromCart(title: string): void {
    let cart = JSON.parse(localStorage.getItem('cart'))
    const index = cart.findIndex((i) => i.title === title)

    if (index >= 0) {
        cart.splice(index, 1)
        showToast(`Removed ${title} from cart`)
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    if (JSON.parse(localStorage.getItem('cart')).length === 0) {
        localStorage.removeItem('cart')
    }

    updateCartNumber()
    displayShoppingCart()
}

function searchProducts(input: string): void {
    const term: string = input.toUpperCase()
    const regex: RegExp = new RegExp(`^${term}`)

    const catalog = JSON.parse(localStorage.getItem('catalog'))
    const itemsToDisplay: object[] = []


    catalog.forEach((item: BookDetails) => {
        const keyWords = item.title.split(' ')

        keyWords.forEach((word: string) => {
            if (word.toUpperCase().match(regex)) {
                if (!itemsToDisplay.includes(key)) {
                    itemsToDisplay.push(key)
                }
            }
        })
    })

    displayCatalog(itemsToDisplay)
}