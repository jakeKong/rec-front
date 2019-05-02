import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

// import '@babel/polyfill';

/* index.html(div id='root') ==> index.js ==> Root.js ==> store(Configure.js) ==> App.js */
// DOM.. document.get
// JQuery.. $('')
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
