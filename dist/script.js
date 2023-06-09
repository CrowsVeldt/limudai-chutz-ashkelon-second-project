"use strict";
// make checkoutItem function to populate checkout
// show translation of lorem ipsum on hover (comes out gibberish, looks ugly)
document.addEventListener('DOMContentLoaded', (event) => {
    updateCartNumber();
    fetchCatalog();
});
document.addEventListener('click', (event) => {
    // Close shopping cart if click outside of it
    const target = event.target;
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        if (target && !target.classList.contains('cart-focus')) {
            toggleCart();
        }
    }
    // close checkout page if click outside of it
    const checkout = document.getElementById('checkout-page');
    if (checkout && checkout.style.display !== 'none') {
        if (target && !target.classList.contains('checkout-focus')) {
            toggleCheckout();
        }
    }
    // if filter dropdown is open fade out catalog
    const dropButton = document.getElementById('dropdown-button');
    const cards = document.querySelectorAll('.card');
    if (dropButton && dropButton.ariaExpanded === 'true') {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.opacity = '0.5';
            // cards[i].style.filter = 'blur(3px)'
        }
    }
    else {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.opacity = '1';
            // cards[i].style.filter = ''
        }
    }
});
function fetchCatalog() {
    let catalog = [];
    if (localStorage.length === 0) {
        fetch('../catalog.json')
            .then(response => response.json())
            .then(data => {
            data.forEach((entry) => {
                catalog.push(entry);
            });
            localStorage.setItem('catalog', JSON.stringify(catalog));
            // For developement:
            // displayCatalog(catalog.slice(0, 10))
            displayCatalog(catalog);
        });
    }
    else {
        const storedCat = getStoredData('catalog');
        storedCat.forEach(key => {
            if (key != null) {
                catalog.push(key);
            }
        });
        // For developement:
        // displayCatalog(catalog.slice(0, 10))
        displayCatalog(catalog);
    }
}
function toggleCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement) {
        cartElement.remove();
    }
    else {
        displayShoppingCart();
    }
}
function toggleCheckout() {
    const checkout = document.getElementById('checkout-page');
    const children = document.body.children;
    if (checkout && checkout.style.display !== 'none') {
        checkout.style.display = 'none';
        checkout.innerHTML = '';
        for (let child in children) {
            if (typeof children[child] === 'object' && !children[child].classList.contains('checkout-focus')) {
                children[child].style.filter = '';
            }
        }
    }
    else if (checkout) {
        checkout.style.display = 'flex';
        for (let child in children) {
            if (typeof children[child] === 'object' && !children[child].classList.contains('checkout-focus')) {
                children[child].style.filter = 'blur(5px)';
            }
        }
        makeCheckoutPage();
    }
}
function displayCatalog(list = getStoredData('catalog'), sortMethod) {
    const catalog = document.getElementById('catalog');
    if (catalog && catalog.hasChildNodes()) {
        catalog.innerHTML = '';
    }
    list.sort(sortCatalogBy(sortMethod)).forEach((item) => {
        if (catalog) {
            catalog.appendChild(makeProductCard(item));
        }
    });
}
function displayShoppingCart() {
    const cartRendered = document.getElementById('cart');
    const storedCartData = getStoredData('cart');
    if (cartRendered) {
        cartRendered.remove();
    }
    const cart = document.createElement('div');
    cart.id = 'cart';
    cart.classList.add('bg-light', 'text-center', 'border', 'border-secondary', 'rounded-bottom-2', 'd-flex', 'flex-column', 'pt-1', 'text-dark', 'cart-focus');
    cart.style.overflow = 'scroll';
    cart.style.maxHeight = '90%';
    const checkout = document.createElement('span');
    const checkoutButton = `<button class="btn btn-danger mb-3 checkout-focus" onclick="toggleCheckout()">Go to Checkout</button>`;
    const message = document.createElement('h5');
    message.classList.add('cart-focus', 'text-decoration-underline', 'my-3');
    if ((storedCartData)) {
        let price = 0;
        storedCartData.forEach((item) => {
            price += item.pages;
            message.innerHTML = `Total: ${priceFormat.format(price)}`;
            cart.appendChild(makeCartItem(item));
        });
        checkout.style.display = 'inline-block';
    }
    else {
        message.innerHTML = "Nothing here yet!";
        checkout.style.display = 'none';
    }
    cart.appendChild(message);
    checkout.innerHTML = checkoutButton;
    cart.appendChild(checkout);
    document.body.appendChild(cart);
}
function sortCatalogBy(method = 'titleFirst') {
    let sortFunction = (a, b) => 1; // <- placeholder function for type checking
    const dropdownButton = document.getElementById('dropdown-button');
    if (dropdownButton) {
        switch (method) {
            case 'priceHigh':
                dropdownButton.innerHTML = 'Highest to Lowest';
                sortFunction = (a, b) => b.pages - a.pages;
                break;
            case 'priceLow':
                dropdownButton.innerHTML = 'Lowest to Highest';
                sortFunction = (a, b) => a.pages - b.pages;
                break;
            case 'authorFirst':
                dropdownButton.innerHTML = 'Author: A to Z';
                sortFunction = (a, b) => {
                    const aLast = a.author.split(' ').slice(-1)[0];
                    const bLast = b.author.split(' ').slice(-1)[0];
                    return aLast.localeCompare(bLast);
                };
                break;
            case 'authorLast':
                dropdownButton.innerHTML = 'Author: Z to A';
                sortFunction = (a, b) => {
                    const aLast = a.author.split(' ').slice(-1)[0];
                    const bLast = b.author.split(' ').slice(-1)[0];
                    return bLast.localeCompare(aLast);
                };
                break;
            case 'titleFirst':
                dropdownButton.innerHTML = 'Title: A to Z';
                sortFunction = (a, b) => a.title.localeCompare(b.title);
                break;
            case 'titleLast':
                dropdownButton.innerHTML = 'Title: Z to A';
                sortFunction = (a, b) => b.title.localeCompare(a.title);
                break;
            default:
                console.error('no sort method supplied');
        }
    }
    return sortFunction;
}
function updateCartNumber() {
    const cartNum = document.getElementById('cart-number');
    const cart = getStoredData('cart');
    if (cart && cartNum) {
        const cartLength = cart.length;
        cartNum.className = 'round-white-border';
        cartNum.innerHTML = cartLength.toString();
    }
    else if (cartNum) {
        cartNum.className = '';
        cartNum.innerHTML = '';
    }
}
function addItemToCart(deetz) {
    let cart = getStoredData('cart');
    if (cart != null) {
        if (!cart.some((e) => e.title === deetz.title)) {
            cart.push(deetz);
            localStorage.setItem('cart', JSON.stringify(cart));
            showToast(`Added ${deetz.title} to cart`);
        }
    }
    else {
        localStorage.setItem('cart', JSON.stringify([deetz]));
        showToast(`Added ${deetz.title} to cart`);
    }
    if (document.getElementById('cart')) {
        displayShoppingCart();
    }
    updateCartNumber();
}
function removeItemFromCart(title) {
    let cart = getStoredData('cart');
    const index = cart.findIndex((i) => i.title === title);
    if (index >= 0) {
        cart.splice(index, 1);
        showToast(`Removed ${title} from cart`);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    if (cart.length === 0) {
        localStorage.removeItem('cart');
    }
    updateCartNumber();
    displayShoppingCart();
}
function searchProducts(input) {
    const term = input.toUpperCase();
    const regex = new RegExp(`^${term}`);
    const storedCatalog = getStoredData('catalog');
    const itemsToDisplay = [];
    if (storedCatalog) {
        storedCatalog.forEach((item) => {
            const keyWords = item.title.split(' ');
            keyWords.forEach((word) => {
                if (word.toUpperCase().match(regex)) {
                    if (!itemsToDisplay.includes(item)) {
                        itemsToDisplay.push(item);
                    }
                }
            });
        });
    }
    displayCatalog(itemsToDisplay);
}
