"use strict";
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
