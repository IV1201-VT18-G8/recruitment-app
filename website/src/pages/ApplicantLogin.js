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
			<div>
				<PageContent>
					<PageHeader>
						<FormattedMessage id="loginHeader" defaultMessage="Applicant login" />
					</PageHeader>
					<LoginForm onLoginRedirect="/" />
				</PageContent>
			</div>
		);
	}
}

export default ApplicantLogin;
