import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptLogin } from '../actions';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions';

class LoginForm extends Component {
	render() {
		let formStyle = {};

		return (
			<form style={formStyle}>
				<p>
					<label htmlFor="username">Username</label>
					<br /><input type="text" ref="username" id="username" />
				</p>
				<p>
					<label htmlFor="password">Password</label>
					<br /><input type="password" ref="password" id="password" />
				</p>
				<button type="button" onClick={(event) => this.handleSubmit(event)}>
					Log in
				</button>
			</form>
		);
	}

	handleSubmit(event) {
		const { dispatch } = this.props;
		const credentials = {
			username: this.refs.username.value.trim(),
			password: this.refs.password.value.trim(),
		};
		dispatch(attemptLogin(credentials));
	}
}

export default LoginForm;
