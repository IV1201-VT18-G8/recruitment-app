import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import {Switch, Route, Link} from 'react-router-dom';
import './App.css';
import ApplicantApp from './pages/ApplicantApp';
import ApplicantLogin from './pages/ApplicantLogin';
import Recruiter from './pages/Recruiter';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import ProtectedRoute from './components/ProtectedRoute';
import { connect } from 'react-redux';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { getLanguage } from './utils';


class App extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		let applicantLoginPath = "/login";
		let lang = getLanguage()
		return (
			<IntlProvider locale={lang} messages={
				messages[lang]
			}
			>
				<div className="App">
					<SiteHeader>
						<FormattedMessage id="applicationSiteHeader" defaultMessage="Recruitment" />
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
			</IntlProvider>
		);
	}
}

export default App;
