export const getProd = () => {
    return fetch('https://fakestoreapi.com/products').then(res => res.json())
}

