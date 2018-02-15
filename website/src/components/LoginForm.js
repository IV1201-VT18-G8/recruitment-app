import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptLogin } from '../actions';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions';
import { connect } from 'react-redux';

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
				{this.errorP()}
			</form>
		);
	}

	errorP() {
		let errMsgStyle = {
			color: 'red'
		}
		return this.props.errorMessage ? (<p style={errMsgStyle}>{this.props.errorMessage}</p>): null
	}

	handleSubmit(event) {
		const credentials = {
			username: this.refs.username.value.trim(),
			password: this.refs.password.value.trim(),
		};
		this.props.onLoginSubmit(credentials);
	}
}

LoginForm.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	loginErrors: PropTypes.object.isRequired,
	onLoginSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.isAuthenticated,
		loginErrors: state.loginErrors
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onLoginSubmit: credentials => dispatch(attemptLogin(credentials))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
