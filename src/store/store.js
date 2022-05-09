import {compose, createStore, applyMiddleware} from 'redux'
// import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const loggerMiddleWare = (store) => (next) => (action) => {
    if (!action.type){
        return next(action)
    }

    console.log('type:', action.type);
    console.log('payload:', action.payload);
    console.log('currentState:', store.getState());

    next(action)
    
    console.log('next state:', store.getState() );
}

const middleWares = [loggerMiddleWare]

const composedEnhancers = compose(applyMiddleware(...middleWares))


export const store = createStore(rootReducer, undefined, composedEnhancers) 




//middleware are library helpers that run before action hits the reducer
// second argument in create store is an additional default state; it's an optional parameter
