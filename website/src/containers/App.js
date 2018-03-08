import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import './App.css';
import ApplicantApp from '../containers/ApplicantApp';
import Recruiter from '../containers/Recruiter';
import ApplicantLogin from '../pages/ApplicantLogin';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ProtectedRoute from '../components/ProtectedRoute';
import { FormattedMessage } from 'react-intl';

/**
 * The main Component of the website, or the website itself.
 */
class App extends Component {
	render() {
		let applicantLoginPath = "/login";
		return (
			<div className="App">
				<SiteHeader>
					<FormattedMessage id="siteHeader" defaultMessage="Recruitment" />
				</SiteHeader>

				<Switch>
					<Route path="/recruiter" component={Recruiter} />
					<Route path={applicantLoginPath} component={ApplicantLogin} />
					<ProtectedRoute component={ApplicantApp} loginPath={applicantLoginPath}/>
				</Switch>

				<SiteFooter>
					<p>
						<Link to="/recruiter">
							<FormattedMessage id="recruiterLink" defaultMessage="Recruiter" />
						</Link>
					</p>
				</SiteFooter>
			</div>
		);
	}
}

export default App;
