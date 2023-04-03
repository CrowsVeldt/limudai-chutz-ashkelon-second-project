function displayProducts (){
    fetch('catalog.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(entry => productCard(entry))
        })
}

function productCard (deetz) {

    const card = document.createElement('div')
    card.className = 'card'
    card.style.width = '18rem'

    const body = document.createElement('div')
    body.className = 'card-body'

    const title = document.createElement('h5')
    title.className = "card-title"
    title.innerHTML = deetz.title

    const price = document.createElement('p')
    price.className = 'card-text'
    price.innerHTML = '100' //deetz.price

    const addButton = document.createElement('button')
    addButton.className = 'btn btn-primary'
    addButton.innerHTML = 'Add to cart'
    // addButton.onclick = addItemToCart(this)

    body.appendChild(title)
    body.appendChild(price)
    body.appendChild(addButton)
    card.appendChild(body)

    document.getElementById('catalog').appendChild(card)
}

displayProducts()