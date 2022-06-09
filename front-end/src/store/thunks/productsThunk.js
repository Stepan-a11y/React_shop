import { getProd } from "../API/productsAPI";
import { getProducts, setIsErrProd, setIsLoad, setIsLoadCount, setProdCount, setServProdErr } from "../reducers/productReducer";


export const getProductsThunk = () => {
    return (dispatch) => {
        dispatch(setIsLoad(true))
        getProd()
            .then(data => {
                dispatch(getProducts(data))
                dispatch(setIsLoad(false))
            }
            )
            .catch(err => {
                dispatch(setIsLoad(false))
                dispatch(setServProdErr(err.message))
                dispatch(setIsErrProd(true))
            })
    }
}


export const getProdCountThunk = () => {
    return (dispatch) => {
        dispatch(setIsLoadCount(true))
        getProd()
            .then(data => {
                let arr = [{ itemId: 0, count: 0 }];
                data.forEach(elem => {
                    arr.push({ itemId: elem.id, count: elem.rating.count })
                });
                dispatch(setProdCount(arr))
                dispatch(setIsLoadCount(false))
            }
            )
            .catch(err => {
                dispatch(setIsLoadCount(false))
                dispatch(setServProdErr(err.message))
                dispatch(setIsErrProd(true))
            })
    }
}




