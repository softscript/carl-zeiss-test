import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { Provider, ReactReduxContext } from 'react-redux'

import CreateStore from './Redux'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarlTestRouter from './routes'

const history = createBrowserHistory()
const store = CreateStore(history)
const app = document.getElementById('carl-test')

const render = Component => ReactDOM.render(
  <React.StrictMode>
    <Provider key={Math.random()} store={store} context={ReactReduxContext}>
    <Component history={history} store={store} context={ReactReduxContext} />
    </Provider>
  </React.StrictMode>,
  app
);
render(CarlTestRouter)