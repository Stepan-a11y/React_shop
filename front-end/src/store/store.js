import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

let store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

export default store;