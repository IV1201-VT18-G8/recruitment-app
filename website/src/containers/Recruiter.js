import React, { Component } from 'react';
import RecruiterApp from './RecruiterApp';
import RecruiterLogin from '../pages/RecruiterLogin';
import ProtectedRoute from '../components/ProtectedRoute';
import { Switch, Route } from 'react-router-dom';

/**
 * Container for all pages on the recruiter section of the site.
 */
class Recruiter extends Component {
	render() {
		let recruiterLoginPath = this.props.match.url + "/login"
		return (
			<Switch>
				<Route path={recruiterLoginPath} component={RecruiterLogin} />
				<ProtectedRoute component={RecruiterApp} loginPath={recruiterLoginPath} />
			</Switch>
		);
	}
}
export default Recruiter;
