import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';

class RecruiterLogin extends Component {
	render() {
		return (
			<div>
				<PageContent>
					<PageHeader>Recruiter Login</PageHeader>
					<LoginForm onLoginRedirect="/recruiter" />
				</PageContent>
			</div>
		);
	}
}
export default RecruiterLogin;
