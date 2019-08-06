import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/ie9';
// import '@babel/polyfill';
// import 'react-app-polyfill/stable';
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "build")));
// }
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
