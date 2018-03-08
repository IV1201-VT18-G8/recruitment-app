import React, { Component } from 'react';

export const successMsgStyle = {
	color: 'rgb(53, 162, 19)',
	fontWeight: 'bold',
};

class SuccessMessage extends Component {
	render() {
		return (
			<p style={successMsgStyle}>{this.props.children}</p>
		);
	}
}
export default SuccessMessage;
