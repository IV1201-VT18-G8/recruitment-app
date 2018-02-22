import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import RecruiterAppApplications from '../pages/RecruiterAppApplications';
import RecruiterAppProfile from '../pages/RecruiterAppProfile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

class RecruiterApp extends Component {
	renderNotAuthorized() {
		return (
			<p>
				<FormattedMessage id="notAuthorized" defaultMessage="You are not authorized to view this page." />
			</p>
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
			
		};

		navlinks[messages[this.context.intl.locale].recruiterMenyApplications] = "/"
		navlinks[messages[this.context.intl.locale].recruiterMenyProfile] = "/profile"

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

RecruiterApp.contextTypes = {
    intl: PropTypes.object
};

RecruiterApp.propTypes = {
	isRecruiter: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	isRecruiter: state.isRecruiter,
});

export default connect(mapStateToProps)(RecruiterApp);
