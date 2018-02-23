import React, { Component } from 'react';
// import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import { FormattedMessage } from 'react-intl';

class RecruiterAppProfile extends Component {
	render() {
		return (
			<div>
				<PageHeader>
					<FormattedMessage id="recruiterProfileHeader" defaultMessage="Profile" />
				</PageHeader>
				<FormattedMessage id="recruiterProfile" defaultMessage="Recruiter profile page." />
			</div>
		);
	}
}
export default RecruiterAppProfile;
