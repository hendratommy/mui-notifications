import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

function configureStore(initialState = {}) {
  const middleware = [thunk];

  const enhancers = [];
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(rootReducer, initialState, composedEnhancers);
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer'); // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

export default configureStore;
