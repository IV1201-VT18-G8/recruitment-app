import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import './App.css';
import ApplicantApp from './pages/ApplicantApp';
import ApplicantLogin from './pages/ApplicantLogin';
import Recruiter from './pages/Recruiter';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import ProtectedRoute from './components/ProtectedRoute';
import { connect } from 'react-redux';

class App extends Component {
	render() {
		let applicantLoginPath = "/login";
		return (
			<div className="App">
				<SiteHeader>Recruitment</SiteHeader>

				<Switch>
					<Route path="/recruiter" component={Recruiter} />
					<Route path={applicantLoginPath} component={ApplicantLogin} />
					<ProtectedRoute component={ApplicantApp} loginPath={applicantLoginPath}/>
				</Switch>

				<SiteFooter>
					<p>
						<Link to="/recruiter">Recruiter</Link>
					</p>
				</SiteFooter>
			</div>
		);
	}
}

export default App;
