import { priceFormat, getStoredData, sortMethodList } from './util.js';
import { removeItemFromCart, addItemToCart, displayCatalog } from './index.js';
function makeProductCard(deetz) {
    const card = document.createElement('div');
    card.classList.add('card', 'border-secondary');
    card.style.width = '18rem';
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = '../res/images/default.jpeg';
    img.alt = 'book';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const title = document.createElement('h5');
    title.className = "card-title";
    title.innerHTML = deetz.title;
    const author = document.createElement('p');
    const authorSplit = deetz.author.split(' ');
    const lastName = authorSplit.pop();
    const firstName = authorSplit.length > 0 ? ', '.concat(authorSplit.join(' ')) : '';
    author.innerHTML = `Author: ${lastName}${firstName}`;
    const price = document.createElement('p');
    price.className = 'card-text';
    price.innerHTML = priceFormat.format(deetz.pages);
    const addButton = document.createElement('button');
    addButton.classList.add('btn', 'btn-primary', 'cart-focus');
    addButton.innerHTML = 'Add to cart';
    addButton.addEventListener('click', () => {
        addItemToCart(deetz);
    });
    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(price);
    cardBody.appendChild(addButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    return card;
}
function makeCartItem(deetz) {
    const item = document.createElement('div');
    item.classList.add('d-flex', 'flex-column', 'align-items-start', 'shadow-sm', 'cart-focus', 'p-2');
    item.innerHTML = `<h6 class="cart-focus">${deetz.title}</h6>
                    <p class="cart-focus">${priceFormat.format(deetz.pages)}</p>`;
    const remove = document.createElement('button');
    remove.innerHTML = 'Remove from cart';
    remove.classList.add('cart-focus', 'btn', 'btn-secondary');
    remove.addEventListener('click', () => {
        removeItemFromCart(deetz.title);
    });
    item.appendChild(remove);
    return item;
}
function makeCheckoutItem(deetz) {
    const item = document.createElement('div');
    item.classList.add('text-center', 'row', 'w-100', 'checkout-focus', 'border-bottom', 'py-2');
    const title = document.createElement('p');
    title.innerHTML = deetz.title;
    title.classList.add('checkout-focus', 'col', 'mb-0');
    const price = document.createElement('p');
    price.innerHTML = priceFormat.format(deetz.pages);
    price.classList.add('checkout-focus', 'col', 'mb-0');
    const remove = document.createElement('button');
    remove.innerText = 'x';
    remove.classList.add('checkout-focus', 'col', 'checkout-remove-button');
    item.appendChild(title);
    item.appendChild(price);
    item.appendChild(remove);
    return item;
}
function makeCheckoutPage() {
    const checkout = document.createElement('div');
    checkout.id = 'checkout';
    checkout.classList.add('checkout-focus');
    const topPanel = document.createElement('div');
    topPanel.id = 'top-panel';
    topPanel.classList.add('checkout-focus');
    const bottomPanel = document.createElement('div');
    bottomPanel.id = 'bottom-panel';
    bottomPanel.classList.add('checkout-focus', 'd-flex', 'flex-column', 'text-center');
    const purchaseList = document.createElement('div');
    purchaseList.id = 'purchase-list';
    purchaseList.classList.add('checkout-focus', 'container', 'align-center');
    const message = document.createElement('h2');
    message.id = 'checkout-total';
    message.classList.add('checkout-focus', 'my-1');
    const purchaseButton = document.createElement('button');
    purchaseButton.id = 'purchase-button';
    purchaseButton.classList.add('checkout-focus', 'btn', 'btn-success');
    purchaseButton.innerText = 'Buy now!';
    const cart = getStoredData('cart');
    if (cart) {
        let amount = 0;
        cart.forEach((item) => {
            amount += item.pages;
            message.innerHTML = `Total: ${priceFormat.format(amount)}`;
            purchaseList.append(makeCheckoutItem(item));
        });
    }
    else {
        message.innerHTML = "Nothing here yet!";
    }
    topPanel.appendChild(purchaseList);
    bottomPanel.appendChild(message);
    bottomPanel.appendChild(purchaseButton);
    checkout.appendChild(topPanel);
    checkout.appendChild(bottomPanel);
    return checkout;
}
function makeSortDropdownItem(method) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.classList.add('dropdown-item');
    button.type = 'button';
    button.innerText = method.title;
    button.addEventListener('click', () => {
        displayCatalog(undefined, method.method);
    });
    item.appendChild(button);
    return item;
}
function makeSortDropdownList() {
    const sort = document.querySelector('#sort');
    let list = [];
    if (sort) {
        list = sortMethodList.map((method) => {
            return makeSortDropdownItem(method);
        });
    }
    return list;
}
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('my-toast', 'rounded-pill', 'px-2', 'pt-3', 'bg-primary', 'text-light', 'border', 'border-dark');
    const toastMessage = document.createElement('p');
    toastMessage.innerHTML = message;
    toast.appendChild(toastMessage);
    document.body.appendChild(toast);
    setTimeout(() => {
        document.querySelectorAll('.my-toast')[0].remove();
    }, 1250);
}
export { makeProductCard, makeCartItem, makeCheckoutItem, makeCheckoutPage, makeSortDropdownList, showToast };
