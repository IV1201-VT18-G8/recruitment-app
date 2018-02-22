import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ApplicantsList from '../components/ApplicantsList';
import { FormattedMessage } from 'react-intl';

class RecruiterAppApplications extends Component {
	render() {
		return (
			<div>
				<PageHeader><FormattedMessage id="recruiterHeader.message" defaultMessage="Application" /></PageHeader>
				<ApplicantsList />
			</div>
		);
	}
}
export default RecruiterAppApplications;
