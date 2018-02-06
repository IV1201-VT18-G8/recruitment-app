import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import ApplicantAppProfile from '../pages/ApplicantAppProfile';
import ApplicantAppApplication from '../pages/ApplicantAppApplication';

class ApplicantApp extends Component {
	render() {
		let navlinks = {
			"Application": "/",
			"Profile": "/profile",
			"Log out": "#"
		};

		return (
			<div>
				<Navigation links={navlinks} />
				<PageContent>
					<Switch>
						<Route path={this.props.match.url + "profile"} component={ApplicantAppProfile} />
						<Route component={ApplicantAppApplication} />
					</Switch>
				</PageContent>
			</div>
		);
	}
}
export default ApplicantApp;
