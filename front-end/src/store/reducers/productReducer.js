import { GET_PRODUCTS } from "./constants"
import { SET_PRODUCTS_COUNT } from "./constants"
import { IS_LOADING } from "./constants"
import { IS_LOADING_COUNT } from "./constants"
import { SET_PRODUCTS_BASKET } from "./constants"
import { UPDATE_PRODUCTS_BASKET } from "./constants"
import { SET_TOTAL_COUNT } from "./constants"
import { SET_TOTAL_PRICE } from "./constants"
import { DELETE_ALL_PROD } from "./constants"
import { DELETE_ONE_ITEM } from "./constants"
import { SET_ERR0R_SERVER_PROD } from "./constants"
import { SET_IS_ERR_PROD } from "./constants"

const initialState = {
    products: [],
    prodCount: [],
    basket: [],
    allPrice: 0,
    allCount: 0,
    isLoad: false,
    isLoadCount: false,
    prodError: "",
    isErrProd: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, products: action.products, isLoad: false }
        case SET_PRODUCTS_COUNT:
            return { ...state, prodCount: action.prodCount }
        case SET_PRODUCTS_BASKET:
            return { ...state, basket: [...state.basket, ...action.payload] }
        case UPDATE_PRODUCTS_BASKET:
            return {
                ...state, basket: state.basket.map(elem => {
                    if (elem.id === action.payload.id) {
                        return action.payload
                    } else {
                        return elem;
                    }
                })
            }
        case DELETE_ALL_PROD:
            return { ...state, basket: action.payload, allCount: action.allCount, allPrice: action.allPrice }
        case DELETE_ONE_ITEM:
            return { ...state, basket: state.basket.filter(n => n.id !== action.id) }
        case SET_TOTAL_COUNT:
            return { ...state, allCount: action.allCount }
        case SET_TOTAL_PRICE:
            return { ...state, allPrice: action.allPrice }
        case IS_LOADING:
            return { ...state, isLoad: action.isLoad }
        case IS_LOADING_COUNT:
            return { ...state, isLoadCount: action.isLoadCount }
        case SET_ERR0R_SERVER_PROD:
            return {...state, prodError: action.payload}
        case SET_IS_ERR_PROD:
            return {...state, isErrProd: action.payload}
        default:
            return state
    }
}

export const getProducts = (products) => ({ type: GET_PRODUCTS, products })

export const setProdCount = (prodCount) => ({ type: SET_PRODUCTS_COUNT, prodCount })

export const setIsLoad = (isLoad) => ({ type: IS_LOADING, isLoad })

export const setIsLoadCount = (isLoadCount) => ({ type: IS_LOADING_COUNT, isLoadCount })

export const setTotalCount = (allCount) => ({ type: SET_TOTAL_COUNT, allCount })

export const setTotalPrice = (allPrice) => ({ type: SET_TOTAL_PRICE, allPrice })

export const setProdBasket = (id, title, price, totalPrice, totalCount) => ({ type: SET_PRODUCTS_BASKET, payload: [{ id, title, price, totalPrice, totalCount }] })

export const updateProdBasket = (id, title, price, totalPrice, totalCount) => ({ type: UPDATE_PRODUCTS_BASKET, payload: { id, title, price, totalPrice, totalCount } })

export const delAllProd = () => ({ type: DELETE_ALL_PROD, payload: [], allCount: 0, allPrice: 0 })

export const deleteItem = (id) => ({ type: DELETE_ONE_ITEM, id })

export const setServProdErr = (msg) => ({type: SET_ERR0R_SERVER_PROD, payload: msg})

export const setIsErrProd = (isErr) => ({type: SET_IS_ERR_PROD, payload: isErr})

export default productReducer;