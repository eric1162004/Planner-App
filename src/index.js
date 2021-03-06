import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/rootReducer';
import thunk from 'redux-thunk';

import {reduxFirestore, getFirestore, createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider, getFirebase} from 'react-redux-firebase'
import {firebase, fbConfig} from './config/fbConfig'


const store = createStore(
    rootReducer,
    compose(
        // thunk: allow async code before dispatch
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, fbConfig)
    )
  );
  
const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
