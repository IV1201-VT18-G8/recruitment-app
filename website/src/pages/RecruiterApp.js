import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import RecruiterAppApplications from '../pages/RecruiterAppApplications';
import RecruiterAppProfile from '../pages/RecruiterAppProfile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecruiterApp extends Component {
	renderNotAuthorized() {
		return (
			<p>You are not authorized to view this page.</p>
		)
	}

	renderAuthorized() {
		return (
			<Switch>
				<Route path={this.props.match.url + "/profile"} component={RecruiterAppProfile} />
				<Route component={RecruiterAppApplications} />
			</Switch>
		)
	}

	render() {
		let navlinks = {
			"Applications": "/recruiter",
			"Profile": "/recruiter/profile"
		};

		return (
			<div>
				<Navigation links={navlinks} loginPageURL="/recruiter/login" />
				<PageContent>
					{this.props.isRecruiter ? this.renderAuthorized() : this.renderNotAuthorized()}
				</PageContent>
			</div>
		);
	}
}

RecruiterApp.propTypes = {
	isRecruiter: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	isRecruiter: state.isRecruiter,
});

export default connect(mapStateToProps)(RecruiterApp);
