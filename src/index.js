import {createBrowserHistory} from 'history';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk';

import userReducer from 'app/core/reducers/userReducer';

import App from 'app/App';
import registerServiceWorker from './registerServiceWorker';

/**
 * Entry-point class.
 *
 */
class Index {

    /**
     * The constructor method. Executed upon class instantiation.
     *
     * @public
     */
    constructor() {
        window.app = {
            store: this._configureStore()
        };
        this._render();
    }

    /**
     * Configures the application store by invoking Redux's createStore method.
     *
     * @private
     * @param {Object} [initialState] = The initial state.
     * @returns {Object}
     */
    _configureStore(initialState) {
        return createStore(
            combineReducers({
                userReducer
            }),
            initialState,
            applyMiddleware(reduxThunk)
        );
    }

    /**
     * Required React Component lifecycle method. Returns a tree of React components that will render to HTML.
     *
     * @private
     */
    _render() {
        const history = createBrowserHistory({
            basename: '/'
        });
        render(<Provider store={window.app.store}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>, document.getElementById('root'));

        registerServiceWorker();
    }
}

export default new Index();
