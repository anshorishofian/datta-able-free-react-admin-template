import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';
// redux pestist
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['access_token','isLogin','user'] // only navigation will be persisted
}


// const store = createStore(reducer);
const persistReduc = persistReducer(persistConfig, reducer);

const store = createStore(persistReduc);
const persistor = persistStore(store);

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename={config.basename}>
                {/* basename="/datta-able" */}
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
