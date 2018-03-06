import React, { Component } from 'react';
import {Link} from 'react-router-dom';

/**
 * Global site header.
 */
class SiteHeader extends Component {
	render() {
		let headerStyle = {
			width: "100%",
			padding: "30px",
			backgroundColor: "#333",
			color: "#eee"
		};

		let h1Style = {
			margin: "0",
			fontSize: "1.5em",
			lineHeight: "1.5em"
		};

		let aStyle = {
			textDecoration: "none",
			color: "inherit"
		};

		return (
			<header style={headerStyle}>
				<h1 style={h1Style}><Link to="/" style={aStyle}>{this.props.children}</Link></h1>
			</header>
		);
	}
}
export default SiteHeader;
