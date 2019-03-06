import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { Provider } from 'react-redux'
import hdfcLife from './reducer.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { Route } from 'react-router-dom'
import URLSwitch from './pages/URLSwitch'
const routing = (
    <Router>
      <div>
        <Route exact path="/" component={URLSwitch} />
        <Route path="/hdfcLife" component={URLSwitch} />
      </div>
    </Router>
  )
const persistConfig = {
    key: 'root',
    storage,
    whiteList: [hdfcLife]
}
const persistedReducer = persistReducer(persistConfig, hdfcLife)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
let persistor = persistStore(store)
ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    {routing}
    </PersistGate>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
