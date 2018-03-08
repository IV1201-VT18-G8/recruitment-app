import React, { Component } from 'react';

/**
 * Container for page-specific content.
 */
class PageContent extends Component {
	render() {
		let mainStyle = {
			maxWidth: "700px",
			margin: "0 auto",
			padding: "30px",
		};

		return (
			<main style={mainStyle}>
				{this.props.children}
			</main>
		);
	}
}
export default PageContent;
