import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';

import About from 'app/routes/About';
import Chat from 'app/routes/Chat';

/**
 * The main app container.
 */
class App extends Component {

    /**
     * Required React Component lifecycle method. Returns a tree of React components that will render to HTML.
     *
     * @override
     * @protected
     * @returns {ReactElement}
     */
    render() {
        const {pathname} = this.props.location;
        return <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
            <header className='mdl-layout__header'>
                <div className='mdl-layout__header-row'>
                    <span className='mdl-layout-title'>React Demo / Scaffold</span>
                </div>
                <div className='mdl-layout__tab-bar mdl-js-ripple-effect'>
                    <Link className={`mdl-layout__tab${['/', '/about'].indexOf(pathname) >= 0 ? ' is-active' : ''}`} to='/'>About</Link>
                    <Link className={`mdl-layout__tab${pathname === '/chat' ? ' is-active' : ''}`} to='/chat'>Chat</Link>
                </div>
            </header>
            <div className='mdl-layout__drawer'>
                <span className='mdl-layout-title'>Nothing here yet</span>
            </div>
            <main className='mdl-layout__content'>
                <Switch>
                    <Route exact path='/' component={About}/>
                    <Route exact path='/chat' component={Chat}/>
                    <Redirect from='/about' to='/'/>
                </Switch>
            </main>
        </div>;
    }
}

App.propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object
};

const mapStateToProps = (state = {}) => {
    const {user} = state.userReducer;
    return {
        user
    };
};

export default withRouter(connect(mapStateToProps)(App));