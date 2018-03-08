import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import { FormattedMessage } from 'react-intl';

/**
 * Login page for applicants.
 */
class ApplicantLogin extends Component {
	render() {
		return (
			<PageContent>
				<PageHeader>
					<FormattedMessage id="loginHeader" defaultMessage="Applicant login" />
				</PageHeader>
				<LoginForm onLoginRedirect="/" />
			</PageContent>
		);
	}
}

export default ApplicantLogin;
