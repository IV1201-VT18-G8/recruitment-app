import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptLogin } from '../actions';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

let errMsgStyle = {
	color: '#ce1717',
	fontSize: '0.8em'
};

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
		const error = this.props.loginErrors[fieldName];
		return error ? (<p style={errMsgStyle}>{error}</p>): null;
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
