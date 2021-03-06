import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageContent from '../components/PageContent';
import ApplicantProfile from '../pages/ApplicantProfile';
import ApplicantApplication from '../pages/ApplicantApplication';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/**
 * Container for auth protected pages on the applicant section of the site.
 */
class ApplicantApp extends Component {
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
				<Route path={this.props.match.url + "profile"} component={ApplicantProfile} />
				<Route component={ApplicantApplication} />
			</Switch>
		)
	}

	render() {
		let navlinks = {};
		navlinks[messages[this.context.intl.locale].applicantMenyApplication] = "/"
		navlinks[messages[this.context.intl.locale].applicantMenyProfile] = "/profile"
		
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

ApplicantApp.contextTypes = {
    intl: PropTypes.object
};

ApplicantApp.propTypes = {
	isApplicant: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	isApplicant: state.isApplicant,
});

export default connect(mapStateToProps)(ApplicantApp);
