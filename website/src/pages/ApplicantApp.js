import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import ApplicantAppProfile from '../pages/ApplicantAppProfile';
import ApplicantAppApplication from '../pages/ApplicantAppApplication';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ApplicantApp extends Component {
	renderNotAuthorized() {
		return (
			<p>You are not authorized to view this page.</p>
		)
	}

	renderAuthorized() {
		return (
			<Switch>
				<Route path={this.props.match.url + "profile"} component={ApplicantAppProfile} />
				<Route component={ApplicantAppApplication} />
			</Switch>
		)
	}

	render() {
		let navlinks = {
			"Application": "/",
			"Profile": "/profile"
		};

		return (
			<div>
				<Navigation links={navlinks} loginPageURL="/login" />
				<PageContent>
					{this.props.isApplicant ? this.renderAuthorized() : this.renderNotAuthorized()}
				</PageContent>
			</div>
		);
	}
}

ApplicantApp.propTypes = {
	isApplicant: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	isApplicant: state.isApplicant,
});

export default connect(mapStateToProps)(ApplicantApp);
