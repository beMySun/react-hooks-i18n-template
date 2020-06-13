import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunkMiddleware];

let composeEnhancers: <R>(a: R) => R;

if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const configureStore = (rootReducers: any) => {
  const reduxState = localStorage.getItem('reduxState');

  const global = JSON.parse(reduxState || '{}')?.global || {};
  const persistedState = reduxState ? { global } : undefined;

  const store = createStore(
    rootReducers,
    persistedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  });

  return store;
};

export const store = configureStore(rootReducer);
export const state = store.getState();
export default configureStore;
