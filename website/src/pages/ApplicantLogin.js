import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';

class ApplicantLogin extends Component {
	render() {
		return (
			<div>
				<PageContent>
					<PageHeader>Applicant Login</PageHeader>
					<LoginForm />
				</PageContent>
			</div>
		);
	}
}

export default ApplicantLogin;
