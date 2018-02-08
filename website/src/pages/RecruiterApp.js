import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import RecruiterAppApplications from '../pages/RecruiterAppApplications';
import RecruiterAppProfile from '../pages/RecruiterAppProfile';

class RecruiterApp extends Component {
	render() {
		let navlinks = {
			"Applications": "/recruiter",
			"Profile": "/recruiter/profile"
		};

		return (
			<div>
				<Navigation links={navlinks} loginPageURL="/recruiter/login" />
				<PageContent>
					<Switch>
						<Route path={this.props.match.url + "/profile"} component={RecruiterAppProfile} />
						<Route component={RecruiterAppApplications} />
					</Switch>
				</PageContent>
			</div>
		);
	}
}
export default RecruiterApp;
