import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

// index.html -> index.js -> root.js(router/store(rootSaga)) -> App.js(route/pages) -> pages....
// pages.... -> container -> components
ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();
