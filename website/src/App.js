import React, { Component } from 'react';
import './App.css';
import Applicant from './pages/Applicant';
import ApplicantLogin from './pages/ApplicantLogin';
import Recruiter from './pages/Recruiter';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/" component={Applicant} />
					<Route path="/login" component={ApplicantLogin} />
					<Route path="/recruiter" component={Recruiter} />
				</div>
			</Router>
		);
	}
}

export default App;
