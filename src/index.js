import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();
