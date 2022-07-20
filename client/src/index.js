import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './custom.scss';
import App from './App';
import '../src/firebase/firebase.utils';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/mdb.css';

import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './redux/store';

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
