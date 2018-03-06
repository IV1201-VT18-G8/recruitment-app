import React, { Component } from 'react';

/**
 * Global site footer.
 */
class SiteFooter extends Component {
	render() {
		let footerStyle = {
			maxWidth: "700px",
			margin: "0 auto",
			padding: "30px",
			fontSize: "0.8em"
		};

		return (
			<footer style={footerStyle}>
				{this.props.children}
			</footer>
		);
	}
}
export default SiteFooter;
