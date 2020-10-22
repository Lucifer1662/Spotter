import {createStore, combineReducers} from  'redux'
import universalReducer from "./UniversalReducer";

 let store = createStore(
    combineReducers({universalReducer }),   /* preloadedState, */
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store;