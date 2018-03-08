import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import { FormattedMessage } from 'react-intl';

/**
 * Login page for recruiters.
 */
class RecruiterLogin extends Component {
	render() {
		return (
			<PageContent>
				<PageHeader><FormattedMessage id="recruiterLoginHeader" defaultMessage="Recruiter Login" /></PageHeader>
				<LoginForm onLoginRedirect="/recruiter" />
			</PageContent>
		);
	}
}
export default RecruiterLogin;
