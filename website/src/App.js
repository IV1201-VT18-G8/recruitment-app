import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import ApplicantApp from './pages/ApplicantApp';
import ApplicantLogin from './pages/ApplicantLogin';
import Recruiter from './pages/Recruiter';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<SiteHeader>Recruitment</SiteHeader>

					<Switch>
						<Route path="/recruiter" component={Recruiter} />
						<Route path="/login" component={ApplicantLogin} />
						<Route component={ApplicantApp} />
					</Switch>

					<SiteFooter>
						<p>
							<Link to="/recruiter">Recruiter</Link>
						</p>
					</SiteFooter>
				</div>
			</Router>
		);
	}
}

export default App;
