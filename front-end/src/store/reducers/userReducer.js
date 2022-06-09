import { GET_USER } from "./constants"
import { SET_AUTH } from "./constants"
import { SET_ERR0R_SERVER_USER } from "./constants"
import { SET_IS_ERR_USER } from "./constants"


const initialState = {
    user: {},
    isAuth: null,
    userError: "",
    isErrUser: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, user: action.payload }
        case SET_AUTH:
            return { ...state, isAuth: action.payload }
        case SET_ERR0R_SERVER_USER:
                return {...state, prodError: action.payload}
        case SET_IS_ERR_USER:
                return {...state, isErrUser: action.payload}
        default:
            return state
    }
}

export const getUserAction = (user) => ({ type: GET_USER, payload: user })

export const setAuthAction = (isAuth) => ({ type: SET_AUTH, payload: isAuth })

export const setServUserErr = (msg) => ({type: SET_ERR0R_SERVER_USER, payload: msg})

export const setIsErrUser = (isErr) => ({type: SET_IS_ERR_USER, payload: isErr})

export default productReducer;