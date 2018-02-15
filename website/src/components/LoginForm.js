import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptLogin } from '../actions';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to={this.props.onLoginRedirect} />;
		}

		let formStyle = {};

		return (
			<form style={formStyle}>
				<p>
					<label htmlFor="username">Username</label>
					<br /><input type="text" ref="username" id="username" style={this.inputStyle('username')}/>
				</p>
				{this.errorP('username')}
				<p>
					<label htmlFor="password">Password</label>
					<br /><input type="password" ref="password" id="password" style={this.inputStyle('password')} />
				</p>
				{this.errorP('password')}
				<button type="button" onClick={(event) => this.handleSubmit(event)}>
					Log in
				</button>
				{this.errorP('non_field_errors')}
			</form>
		);
	}

	inputStyle(fieldName) {
		let style = {
			border: '1px solid black',
			borderRadius: '3px'
		};
		let invalidInputStyle = {
			border: '1px solid #ce1717',
			boxShadow: '0px 0px 5px 0px rgba(206,23,23,0.66)'
		};
		const error = this.props.loginErrors[fieldName];
		return error ? {...style, ...invalidInputStyle} : style;
	}

	errorP(fieldName) {
		let errMsgStyle = {
			color: '#ce1717',
			fontSize: '0.8em'
		}
		const error = this.props.loginErrors[fieldName];
		return error ? (<p style={errMsgStyle}>{error}</p>): null;
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
