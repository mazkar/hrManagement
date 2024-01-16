import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import rootReducers from './models/rootReducers';
import logger from 'redux-logger';

// Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['auth'],
};

// Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// INIT MIDDLEWARES
const middlewares = [ReduxThunk];

// INIT ENHANCER DEBUGGER
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middlewares, logger));

// CREATE STORE
const store = createStore(persistedReducer, enhancer);

// EXPORT PERSISTOR
export const persistor = persistStore(store);

// EXPORT DEFAULT
export default store;
