import React, { Component } from 'react';
import RecruiterFront from './RecruiterFront';
import RecruiterLogin from './RecruiterLogin';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Recruiter extends Component {
	render() {
		return (
			<div>
				<Route exact path={this.props.match.url + "/"} component={RecruiterFront} />
				<Route path={this.props.match.url + "/login"} component={RecruiterLogin} />
			</div>
		);
	}
}
export default Recruiter;
