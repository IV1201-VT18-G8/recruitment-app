import React, { Component } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import { FormattedMessage } from 'react-intl';

class ApplicantAppProfile extends Component {
	render() {
		return (
			<div>
				<PageHeader>
					<FormattedMessage id="applicantHeader" defaultMessage="Application" />
				</PageHeader>
				<PageContent>
					<FormattedMessage id="applicant" defaultMessage="Applicant page" />
					<ApplicationForm onLoginRedirect="/" />
				</PageContent>
			</div>
		);
	}
}
export default ApplicantAppProfile;
