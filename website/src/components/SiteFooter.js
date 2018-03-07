import React, { Component } from 'react';

/**
 * Global site footer.
 */
class SiteFooter extends Component {
	render() {
		let footerStyle = {
			padding: "30px",
			fontSize: "0.8em",
			backgroundColor: "#333",
			width: "100%",
			color: "#eee",
			position: 'fixed',
			bottom: '0px',
		};

		return (
			<footer style={footerStyle}>
				{this.props.children}
			</footer>
		);
	}
}
export default SiteFooter;
