import React, { Component } from 'react';
import PageHeader from '../components/PageHeader';
import { FormattedMessage } from 'react-intl';

/**
 * Page that displays the profile of an applicant, to the applicant themselves.
 */
class ApplicantProfile extends Component {
	render() {
		return (
			<div>
				<PageHeader>
					<FormattedMessage id="applicantProfileHeader" defaultMessage="Profile" />
				</PageHeader>
				<FormattedMessage id="applicantProfile" defaultMessage="Applicant profile page." />
			</div>
		);
	}
}
export default ApplicantProfile;
