import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';

class Root extends Component {
	render() {
		return (
			<Provider store={this.props.store}>
				<Router>
					<Route path="/" component={App} />
				</Router>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;
