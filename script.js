// show translation of lorem ipsum on hover (comes out gibberish, looks ugly)

const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
})

document.addEventListener('DOMContentLoaded', (event) => {
    updateCartNumber()
    fetchCatalog()
})

document.addEventListener('click', (event) => {
    if (document.getElementById('cart')) {
        if (!event.target.classList.contains('cart-focus')) {
            toggleCart()
        }
    }
    const dropButton = document.getElementById('dropdown-button')
    const cards = document.getElementsByClassName('card')
    if (dropButton.ariaExpanded === 'true') {

        for (let i = 0; i < cards.length; i++) {
            cards[i].style.opacity = '0.5'
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.opacity = '1'
        }
    }
})

function fetchCatalog() {
    let catalog = []
    if (localStorage.length === 0) {
        fetch('catalog.json')
            .then(response => response.json())
            .then(data => {
                data.forEach((entry, index) => {
                    catalog.push(entry)
                })
                localStorage.setItem('catalog', JSON.stringify(catalog))
                // For developement:
                // displayCatalog(catalog.slice(0, 10))
                displayCatalog(catalog)
            })
    } else {
        const storedCat = JSON.parse(localStorage.getItem('catalog'))
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

function toggleCart() {
    if (document.getElementById('cart')) {
        document.getElementById('cart').remove()
    } else {
        displayShoppingCart()
    }
}

function displayCatalog(list = JSON.parse(localStorage.getItem('catalog')), sortMethod) {
    const catalog = document.getElementById('catalog')
    if (catalog.hasChildNodes()) {
        catalog.innerHTML = ''
    }
    list.sort(sortCatalogBy(sortMethod)).forEach(item => makeProductCard(item))
}

function sortCatalogBy(method = 'titleFirst') {
    let sortFunction = () => { }
    const dropdownButton = document.getElementById('dropdown-button')

    switch (method) {
        case 'priceHigh':
            dropdownButton.innerHTML = 'Highest to Lowest'
            sortFunction = (a, b) => b.pages - a.pages
            break
        case 'priceLow':
            dropdownButton.innerHTML = 'Lowest to Highest'
            sortFunction = (a, b) => a.pages - b.pages
            break
        case 'authorFirst':
            dropdownButton.innerHTML = 'Author: A to Z'
            sortFunction = (a, b) => {
                const aLast = a.author.split(' ').slice(-1)[0]
                const bLast = b.author.split(' ').slice(-1)[0]
                return aLast.localeCompare(bLast)
            }
            break
        case 'authorLast':
            dropdownButton.innerHTML = 'Author: Z to A'
            sortFunction = (a, b) => {
                const aLast = a.author.split(' ').slice(-1)[0]
                const bLast = b.author.split(' ').slice(-1)[0]
                return bLast.localeCompare(aLast)
            }
            break
        case 'titleFirst':
            dropdownButton.innerHTML = 'Title: A to Z'
            sortFunction = (a, b) => a.title.localeCompare(b.title)
            break
        case 'titleLast':
            dropdownButton.innerHTML = 'Title: Z to A'
            sortFunction = (a, b) => b.title.localeCompare(a.title)
            break
        default:
            console.error('no sort method supplied')
    }

    return sortFunction
}

function updateCartNumber() {
    const cartNum = document.getElementById('cart-number')
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

function addItemToCart(deetz) {
    let cart = JSON.parse(localStorage.getItem('cart'))

    if (cart != null) {
        if (!cart.some(e => e.title === deetz.title)) {
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

function removeItemFromCart(deetz) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    const index = cart.findIndex(e => e.title === deetz.title)

    if (index >= 0) {
        cart.splice(index, 1)
        showToast(`Removed ${deetz.title} from cart`)
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    if (JSON.parse(localStorage.getItem('cart')).length === 0) {
        localStorage.removeItem('cart')
    }

    updateCartNumber()
    displayShoppingCart()
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

function searchProducts(input) {
    const term = input.toUpperCase()
    const regex = new RegExp(`^${term}`)

    const catalog = JSON.parse(localStorage.getItem('catalog'))
    const itemsToDisplay = []


    catalog.forEach(key => {
        const keyWords = key.title.split(' ')

        keyWords.forEach(word => {
            if (word.toUpperCase().match(regex)) {
                console.log(key.title)
                if (!itemsToDisplay.includes(key)) {
                    itemsToDisplay.push(key)
                }
            }
        })
    })

    displayCatalog(itemsToDisplay)
}