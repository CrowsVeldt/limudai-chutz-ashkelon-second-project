"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoredData = exports.priceFormat = void 0;
const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
});
exports.priceFormat = priceFormat;
function getStoredData(key) {
    let data = [];
    const storedData = JSON.parse(localStorage.getItem(key));
    if (storedData) {
        data = storedData;
    }
    return data;
}
exports.getStoredData = getStoredData;
