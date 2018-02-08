import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';

class ApplicantLogin extends Component {
	render() {
		const {dispatch} = this.props;

		return (
			<div>
				<PageContent>
					<PageHeader>Applicant Login</PageHeader>
					<LoginForm dispatch={dispatch}/>
				</PageContent>
			</div>
		);
	}
}
export default connect(null)(ApplicantLogin);
