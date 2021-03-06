import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptLogin } from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ErrorMessage, { errMsgStyle } from './ErrorMessage';
import { inputStyle, invalidInputStyle } from '../consts.js';

/**
 * A login form.
 *
 * Calls `this.props.onLoginSubmit` on submit.
 * Redirects to `this.props.onLoginRedirect` when user is authenticated.
 */
class LoginForm extends Component {
	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to={this.props.onLoginRedirect} />;
		}

		let formStyle = {};
		let labelStyle = {
			display: 'block',
			marginBottom: '5px'
		};

		return (
			<form style={formStyle} onSubmit={(event) => this.handleSubmit(event)}>
				<p>
					<label htmlFor="username" style={labelStyle}>
							<FormattedMessage id="usernameLabel" defaultMessage="Username" />
					</label>
					<input type="text" ref="username" id="username" style={this.inputStyle('username')}/>
					{this.errorSpan('username')}
				</p>
				<p>
					<label htmlFor="password" style={labelStyle}>
							<FormattedMessage id="passwordLabel" defaultMessage="Password" />
					</label>
					<input type="password" ref="password" id="password" style={this.inputStyle('password')} />
					{this.errorSpan('password')}
				</p>
				<button type="submit">
					<FormattedMessage id="loginButtonLabel" defaultMessage="Log in" />
				</button>
				{this.errorP('non_field_errors')}
				{this.errorP('request')}
			</form>
		);
	}

	inputStyle(fieldName) {
		const error = this.props.loginErrors[fieldName];
		return error ? {...inputStyle, ...invalidInputStyle} : inputStyle;
	}

	errorP(fieldName) {
		const error = this.props.loginErrors[fieldName];
		return error ? (<ErrorMessage>{error}</ErrorMessage>): null;
	}

	errorSpan(fieldName) {
		const error = this.props.loginErrors[fieldName];
		return error ? (<span style={errMsgStyle}><br />{error}</span>): null;
	}

	handleSubmit(event) {
		event.preventDefault();
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
	onLoginSubmit: PropTypes.func.isRequired,
	onLoginRedirect: PropTypes.string.isRequired
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
