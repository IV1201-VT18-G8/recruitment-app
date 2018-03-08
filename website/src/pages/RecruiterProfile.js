import React, { Component } from 'react';
import PageHeader from '../components/PageHeader';
import { FormattedMessage } from 'react-intl';

/**
 * Page that displays the profile of a recruiter to themselves.
 */
class RecruiterProfile extends Component {
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
export default RecruiterProfile;
