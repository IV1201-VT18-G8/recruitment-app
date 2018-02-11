import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { attemptFetchApplicants } from '../actions';

class ApplicantsList extends Component {
	render() {
		let tableStyle = {
			borderCollapse: 'collapse'
		};

		let cellStyle = {
			border: '1px solid #bbb',
			padding: '10px',
			textAlign: 'left'
		}

		return (
			<table style={tableStyle}>
				<thead>
					<tr>
						<th scope="col" style={cellStyle}>First name</th>
						<th scope="col" style={cellStyle}>Last name</th>
						<th scope="col" style={cellStyle}>Username</th>
						<th scope="col" style={cellStyle}>Email</th>
						<th scope="col" style={cellStyle}>SSN</th>
					</tr>
				</thead>

				<tbody>
					{this.props.applicants.map((applicant, id) => {
						return (
							<tr key={id}>
							<td style={cellStyle}>{applicant.first_name}</td>
							<td style={cellStyle}>{applicant.last_name}</td>
							<td style={cellStyle}>{applicant.username}</td>
							<td style={cellStyle}><a href={"mailto" + applicant.email}>{applicant.email}</a></td>
							<td style={cellStyle}>{applicant.social_security_number}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		);
	}

	componentDidMount() {
		this.props.onRender();
	}
}

ApplicantsList.propTypes = {
	applicants: PropTypes.array.isRequired,
	onRender: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	applicants: state.applicants
});

const mapDispatchToProps = dispatch => {
	return {
		onRender: () => dispatch(attemptFetchApplicants())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ApplicantsList);
