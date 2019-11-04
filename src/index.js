import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import es6promise from 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

es6promise.polyfill(); // Required, because `Promise` is undefined in IE.

// index.html -> index.js -> root.js(router/store(rootSaga)) -> App.js(route/pages) -> pages....
// pages.... -> container -> components
ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();
