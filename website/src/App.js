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
import detectBrowserLanguage from 'detect-browser-language';
import { FormattedMessage } from 'react-intl';


class App extends Component {
	constructor(props) {
		super(props)
		console.log(window.navigator.language)
	}
	render() {
		let applicantLoginPath = "/login";
		let lang = this.language()
		return (
			<IntlProvider locale={lang} messages={
				messages[lang]
			}
			>
				<div className="App">
					<SiteHeader>
						<FormattedMessage id="applicationSiteHeader.message" defaultMessage="Recruitment" />
					</SiteHeader>

					<Switch>
						<Route path="/recruiter" component={Recruiter} />
						<Route path={applicantLoginPath} component={ApplicantLogin} />
						<ProtectedRoute component={ApplicantApp} loginPath={applicantLoginPath}/>
					</Switch>

					<SiteFooter>
						<p>
							<Link to="/recruiter">
								<FormattedMessage id="recruiterLink.message" defaultMessage="Recruiter" />
							</Link>
						</p>
					</SiteFooter>
				</div>
			</IntlProvider>
		);
	}
	language() {
		return detectBrowserLanguage().substring(0, 2).toLowerCase()
	}
}



export default App;
