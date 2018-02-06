import React, { Component } from 'react';

class LoginForm extends Component {
	render() {
		let formStyle = {};

		return (
			<form style={formStyle}>
				<p>
					<label htmlFor="username">Username</label>
					<br /><input type="text" name="username" id="username" />
				</p>
				<p>
					<label htmlFor="password">Password</label>
					<br /><input type="password" name="password" id="password" />
				</p>
				<button type="button">Log in</button>
			</form>
		);
	}
}
export default LoginForm;
