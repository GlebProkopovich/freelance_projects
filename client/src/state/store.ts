import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';

const persistedReducer = persistReducer(persistConfig, reducers);

// const store = createStore(reducers, applyMiddleware(thunk));

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

// export default store;
