import { createStore, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import modules, { rootSaga } from './rootSaga';

const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(modules, composeEnhancers(applyMiddleware(logger, sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;