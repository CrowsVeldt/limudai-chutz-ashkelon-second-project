"use strict";
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
    const catalog = document.getElementById('catalog');
    if (catalog)
        catalog.appendChild(card);
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
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('my-toast', 'rounded-pill', 'px-2', 'pt-3', 'bg-primary', 'text-light', 'border', 'border-dark');
    const toastMessage = document.createElement('p');
    toastMessage.innerHTML = message;
    toast.appendChild(toastMessage);
    document.body.appendChild(toast);
    setTimeout(() => {
        document.getElementsByClassName('my-toast')[0].remove();
    }, 1250);
}
function makeCheckoutItem(deetz) {
    const item = document.createElement('div');
    item.classList.add('d-flex', 'justify-content-between', 'text-start', 'w-100', 'checkout-focus');
    const title = document.createElement('p');
    title.innerHTML = deetz.title;
    title.classList.add('checkout-focus');
    const price = document.createElement('p');
    price.innerHTML = priceFormat.format(deetz.pages);
    price.classList.add('checkout-focus');
    item.appendChild(title);
    item.appendChild(price);
    return item;
}
function makeCheckoutPage() {
    const checkout = document.getElementById('checkout-page');
    const leftPanel = document.createElement('div');
    const rightPanel = document.createElement('div');
    leftPanel.classList.add('col', 'checkout-focus');
    rightPanel.classList.add('col', 'checkout-focus');
    const purchaseList = document.createElement('div');
    const message = document.createElement('h2');
    message.classList.add('ms-5', 'checkout-focus');
    const cart = localStorage.getItem('cart');
    if (cart) {
        let amount = 0;
        JSON.parse(cart).forEach((item) => {
            amount += item.pages;
            message.innerHTML = `Total: ${priceFormat.format(amount)}`;
            purchaseList.append(makeCheckoutItem(item));
        });
    }
    else {
        message.innerHTML = "Nothing here yet!";
    }
    leftPanel.appendChild(purchaseList);
    leftPanel.appendChild(message);
    if (checkout) {
        checkout.appendChild(leftPanel);
        checkout.appendChild(rightPanel);
    }
}
