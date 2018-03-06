import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import RecruiterApplications from '../pages/RecruiterApplications';
import RecruiterProfile from '../pages/RecruiterProfile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/**
 * Container for auth protected pages of the recruiter section of the site.
 */
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
				<Route path={this.props.match.url + "/profile"} component={RecruiterProfile} />
				<Route component={RecruiterApplications} />
			</Switch>
		)
	}

	render() {
		let navlinks = {};
		navlinks[messages[this.context.intl.locale].recruiterMenyApplications] = "/recruiter"
		navlinks[messages[this.context.intl.locale].recruiterMenyProfile] = "/recruiter/profile"

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
