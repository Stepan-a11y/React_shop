import { getUser } from "../API/userAPI";
import { getUserAction, setIsErrUser, setServUserErr } from "../reducers/userReducer";

export const getUserThunk = () => {
    return async (dispatch) => {
        getUser()
            .then(data => dispatch(getUserAction(data)))
            .catch(err => {
                dispatch(setServUserErr(err.message))
                dispatch(setIsErrUser(true))
            })
    }
}