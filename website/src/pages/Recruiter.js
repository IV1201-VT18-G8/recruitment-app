import React, { Component } from 'react';
import RecruiterApp from './RecruiterApp';
import RecruiterLogin from './RecruiterLogin';
import ProtectedRoute from '../components/ProtectedRoute';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';

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
