import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { attemptFetchApplicants } from '../actions';
import { FormattedMessage } from 'react-intl';
import ErrorMessage, { errMsgStyle } from './ErrorMessage';

let tableStyle = {
	borderCollapse: 'collapse'
};

let cellStyle = {
	border: '1px solid #bbb',
	padding: '10px',
	textAlign: 'left'
}

class ApplicantsList extends Component {
	render() {
		return (
			<div>
				{this.renderErrors('request')}
				{this.renderErrors('detail')}
				{this.renderTable()}
			</div>
		);
	}

	renderErrors(fieldName) {
		if (!this.props.applicantsFetchErrors[fieldName]) {
			return
		}
		return (
			<ErrorMessage>{this.props.applicantsFetchErrors[fieldName]}</ErrorMessage>
		)
	}

	renderTable() {
		if (this.props.applicants.length == 0) {
			return
		}

		return (
			<table style={tableStyle}>
				<thead>
					<tr>
						<th scope="col" style={cellStyle}><FormattedMessage id="firstName" defaultMessage="First Name" /></th>
						<th scope="col" style={cellStyle}><FormattedMessage id="lastName" defaultMessage="Last Name" /></th>
						<th scope="col" style={cellStyle}><FormattedMessage id="username" defaultMessage="Username" /></th>
						<th scope="col" style={cellStyle}><FormattedMessage id="email" defaultMessage="Email" /></th>
						<th scope="col" style={cellStyle}><FormattedMessage id="socialSecurityNumber" defaultMessage="SSN" /></th>
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
		)
	}

	componentDidMount() {
		this.props.onRender();
	}
}

ApplicantsList.propTypes = {
	applicants: PropTypes.array.isRequired,
	applicantsFetchErrors: PropTypes.object.isRequired,
	onRender: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	applicants: state.applicants,
	applicantsFetchErrors: state.applicantsFetchErrors
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
