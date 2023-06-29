import { priceFormat, sortMethodList } from './util.js';
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
// function makeCheckoutItem(deetz: BookDetails): HTMLDivElement {
//     const item: HTMLDivElement = document.createElement('div')
//     item.classList.add('d-flex', 'justify-content-between', 'text-start', 'w-100', 'checkout-focus', 'mb-3')
//     const title: HTMLParagraphElement = document.createElement('p')
//     title.innerHTML = deetz.title
//     title.classList.add('checkout-focus')
//     const price: HTMLParagraphElement = document.createElement('p')
//     price.innerHTML = priceFormat.format(deetz.pages)
//     price.classList.add('checkout-focus')
//     const rule: HTMLHRElement = document.createElement('hr')
//     rule.classList.add('checkout-focus')
//     item.appendChild(title)
//     item.appendChild(price)
//     item.appendChild(rule)
//     return item
// }
// function makeCheckoutPage(): HTMLDivElement {
//     const checkout: HTMLDivElement = document.createElement('div')
//     checkout.classList.add('checkout-focus')
//     const topPanel: HTMLDivElement = document.createElement('div')
//     const bottomPanel: HTMLDivElement = document.createElement('div')
//     bottomPanel.classList.add('checkout-focus', 'd-flex', 'space-between')
//     const purchaseList: HTMLDivElement = document.createElement('div')
//     const message: HTMLHeadingElement = document.createElement('h2')
//     message.classList.add('ms-5', 'checkout-focus')
//     const purchaseButton: HTMLButtonElement = document.createElement('button')
//     purchaseButton.classList.add('checkout-focus', 'btn', 'btn-success')
//     purchaseButton.innerText = 'Buy now!'
//     const cart: BookDetails[] = getStoredData('cart')
//     if (cart) {
//         let amount: number = 0
//         cart.forEach((item: BookDetails) => {
//             amount += item.pages
//             message.innerHTML = `Total: ${priceFormat.format(amount)}`
//             purchaseList.append(makeCheckoutItem(item))
//         })
//     } else {
//         message.innerHTML = "Nothing here yet!"
//     }
//     topPanel.appendChild(purchaseList)
//     bottomPanel.appendChild(message)
//     bottomPanel.appendChild(purchaseButton)
//     checkout.appendChild(topPanel)
//     checkout.appendChild(bottomPanel)
//     return checkout
// }
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
export { makeProductCard, makeCartItem, 
// makeCheckoutItem, 
// makeCheckoutPage, 
makeSortDropdownList, showToast };
