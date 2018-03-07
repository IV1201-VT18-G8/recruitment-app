import React, { Component } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import { FormattedMessage } from 'react-intl';

/**
 * Page that displays the application of an applicant.
 */
class ApplicantApplication extends Component {
	render() {
		return (
			<div>
				<PageHeader>
					<FormattedMessage id="application" defaultMessage="Application" />
				</PageHeader>
				<ApplicationForm onLoginRedirect="/" />
			</div>
		);
	}
}
export default ApplicantApplication;
