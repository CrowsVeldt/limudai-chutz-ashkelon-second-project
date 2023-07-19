const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
});
function getStoredData(key) {
    let data = [];
    const storedData = JSON.parse(localStorage.getItem(key));
    if (storedData) {
        data = storedData;
    }
    return data;
}
const sortMethodList = [
    { method: 'titleFirst',
        title: 'Title: A to Z' },
    { method: 'titleLast',
        title: 'Title: Z to A' },
    { method: 'authorFirst',
        title: 'Author: A to Z' },
    { method: 'authorLast',
        title: 'Author: Z to A' },
    { method: 'priceLow',
        title: 'Price: Low to High' },
    { method: 'priceHigh',
        title: 'Price: High to Low' },
];
export { priceFormat, sortMethodList, getStoredData };
