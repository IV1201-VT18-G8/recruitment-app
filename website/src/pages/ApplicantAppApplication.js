import React, { Component } from 'react';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import { FormattedMessage } from 'react-intl';

class ApplicantAppProfile extends Component {
	render() {
		return (
			<div>
				<PageHeader>
					<FormattedMessage id="applicantHeader.message" defaultMessage="Application" />
				</PageHeader>
				<FormattedMessage id="applicant.message" defaultMessage="Applicant page" />
			</div>
		);
	}
}
export default ApplicantAppProfile;
