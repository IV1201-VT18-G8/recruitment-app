import React, { Component } from 'react';
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
					<FormattedMessage id="applicantHeader" defaultMessage="Application" />
				</PageHeader>
				<FormattedMessage id="applicant" defaultMessage="Applicant page" />
			</div>
		);
	}
}
export default ApplicantApplication;
