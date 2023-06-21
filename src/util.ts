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

type Sort = (a: BookDetails, b: BookDetails) => number

export {priceFormat, getStoredData, BookDetails, Sort}