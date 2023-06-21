const priceFormat: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS'
})

function getStoredData(key: string): BookDetails[] {
    let data: BookDetails[] = []
    const storedData: BookDetails[] | null = JSON.parse(localStorage.getItem(key)!)
    if (storedData) {
        data = storedData
    }
    return data
}

type BookDetails = {
    author: string
    imageLink: string
    link: string
    pages: number
    title: string
    year: number
}
type SortMethod = {
    method: string
    title: string
}

const sortMethodList: SortMethod[] = [
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
]

type Sort = (a: BookDetails, b: BookDetails) => number

export { priceFormat, sortMethodList, getStoredData, BookDetails, SortMethod, Sort }