import React, { Component } from 'react';
import {DefaultRoute, Switch, Route, Link} from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageHeader from '../components/PageHeader';

class RecruiterAppApplications extends Component {
	render() {
		return (
			<div>
				<PageHeader>Applications</PageHeader>
				Recuiter applications page.
			</div>
		);
	}
}
export default RecruiterAppApplications;
