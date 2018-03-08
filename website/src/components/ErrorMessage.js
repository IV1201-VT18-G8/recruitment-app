import React, { Component } from 'react';

export const errMsgStyle = {
	color: '#ce1717',
	fontSize: '0.8em'
};

class ErrorMessage extends Component {
	render() {
		return (
			<p style={errMsgStyle}>{this.props.children}</p>
		);
	}
}
export default ErrorMessage;
