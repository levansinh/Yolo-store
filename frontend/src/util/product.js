export const getProducts = (count,productList) => {
    const max = productList.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return productList.slice(start, start + count)
}