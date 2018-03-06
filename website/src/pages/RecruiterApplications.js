import React, { Component } from 'react';
import PageHeader from '../components/PageHeader';
import ApplicantsList from '../components/ApplicantsList';
import { FormattedMessage } from 'react-intl';

/**
 * Page that displays all applications to a recuirter.
 */
class RecruiterApplications extends Component {
	render() {
		return (
			<div>
				<PageHeader><FormattedMessage id="recruiterHeader" defaultMessage="Application" /></PageHeader>
				<ApplicantsList />
			</div>
		);
	}
}
export default RecruiterApplications;
