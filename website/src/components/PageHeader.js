import React, { Component } from 'react';

/**
 * Page-specific top level header.
 */
class PageHeader extends Component {
	render() {
		let h2Style = {
			fontSize: "1.2em",
			lineHeight: "1.2em"
		};

		return (
			<h2 style={h2Style}>{this.props.children}</h2>
		);
	}
}
export default PageHeader;
