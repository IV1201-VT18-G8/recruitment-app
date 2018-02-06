import React, { Component } from 'react';
import RecruiterApp from './RecruiterApp';
import RecruiterLogin from './RecruiterLogin';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';

class Recruiter extends Component {
	render() {
		return (
			<Switch>
				<Route path={this.props.match.url + "/login"} component={RecruiterLogin} />
				<Route component={RecruiterApp} />
			</Switch>
		);
	}
}
export default Recruiter;
