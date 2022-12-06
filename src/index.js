/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/auth';

// translations
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import en from "./assets/translations/en.json";
import pt from "./assets/translations/pt.json";

// core components
import App from './App';
import "assets/css/material-dashboard-react.css?v=1.9.0";

import * as serviceWorker from './serviceWorker';

// create store 
const coomposeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, coomposeEnhances(
  applyMiddleware(thunk)
));

// multilingual support
i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'pt',                              // language to use
    resources: {
        en: {
        	global: en
        },
        pt: {
        	global: pt
        },
    }
});

// render dom root
ReactDOM.render(
  <React.StrictMode>
  	<I18nextProvider i18n={i18next}>
    	<Provider store={store}>
      		<App />
    	</Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
