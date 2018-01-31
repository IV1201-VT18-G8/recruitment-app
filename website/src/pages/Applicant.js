import React, { Component } from 'react';

class Applicant extends Component {
	render() {
		return (
			<p>
				{this.props.match.url}<br />
				Applicant page.
			</p>
		);
	}
}
export default Applicant;
