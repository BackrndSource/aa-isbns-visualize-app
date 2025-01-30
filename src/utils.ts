export function addIsbnCheckDigit(isbn: number | string) {
    const isbnString = isbn.toString()
    let sum = 0
    for (let i = 0; i < isbnString.length; i++) {
        sum += Number(isbnString[i]) * (i % 2 === 0 ? 1 : 3)
    }
    return `${isbnString}${(10 - (sum % 10)) % 10}`
}
