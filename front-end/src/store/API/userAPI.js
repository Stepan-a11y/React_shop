export const getUser = () => {
    return fetch('https://fakestoreapi.com/users/1').then(res => res.json())
}