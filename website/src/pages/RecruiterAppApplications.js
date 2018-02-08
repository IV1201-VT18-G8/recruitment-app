import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';
import ApplicantsList from '../components/ApplicantsList';

class RecruiterAppApplications extends Component {
	render() {
		return (
			<div>
				<PageHeader>Applications</PageHeader>
				<ApplicantsList />
			</div>
		);
	}
}
export default RecruiterAppApplications;
