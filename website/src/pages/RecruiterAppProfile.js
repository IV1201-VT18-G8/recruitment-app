import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';

class RecruiterAppProfile extends Component {
	render() {
		return (
			<div>
				<PageHeader>Profile</PageHeader>
				Recuiter profile page.
			</div>
		);
	}
}
export default RecruiterAppProfile;
