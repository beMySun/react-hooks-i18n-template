import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Locale from './components/Locale';
import { store } from './redux/store';

import './App.less';

const history = createBrowserHistory();

const AppContainer = () => (
  <Router history={history}>
    <Provider store={store}>
      <Locale>
        <div>123</div>
      </Locale>
    </Provider>
  </Router>
);

export default AppContainer;
