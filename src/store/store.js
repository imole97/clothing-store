import {compose, createStore, applyMiddleware} from 'redux'
import { rootReducer } from './root-reducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { loggerMiddleWare } from '../middleware/logger'
import thunk from 'redux-thunk'

// import logger from 'redux-logger'



const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}


const thunkMiddleware = (store) => (next) => (action) => {
    if(typeof(action) === 'function'){
        // action(dispatch)
    }
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleWare,thunk].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !== 'production' && 
window && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))


export const store = createStore(persistedReducer, undefined, composedEnhancers) 

export const persistor = persistStore(store)




//middleware are library helpers that run before action hits the reducer
// second argument in create store is an additional default state; it's an optional parameter
// useSelector runs everytime that the state object updates in the root reducer but rerenders 
//a component if the returned object is different in memory. 
// redux persist persists reducer values in local storage