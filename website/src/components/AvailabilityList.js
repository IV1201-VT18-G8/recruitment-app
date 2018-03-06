import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptLogin } from '../actions';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

let errMsgStyle = {
	color: '#ce1717',
	fontSize: '0.8em'
};

let availabilityStyle = {
	marginRight: '5px'
};

class AvailabilityList extends Component {

	constructor(props) {
		super(props)
		this.state = {availabilitiesList: []};
		this.onAddBtnClick = this.onAddBtnClick.bind(this);
		this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
	}

	onAddBtnClick(event) {
				event.preventDefault()
			 	const availabilitiesList = this.state.availabilitiesList;
			 	this.setState({
					 availabilitiesList: availabilitiesList.concat(
						{
							start_date: "",
							end_date: ""
						}
					)
			 });
	 }

	 onDeleteBtnClick(id, event) {
				  event.preventDefault()
				  var availabilitiesList = this.state.availabilitiesList;
					availabilitiesList.splice(id, 1)
				  this.setState({
							availabilitiesList
					});
		}

	render() {
		let availabilityListStyle = {
			listStyleType: 'none'
		}



		return (
			<div>
				<FormattedMessage id="availabilityMessageLabel" defaultMessage="Available " />
				<button type="button" onClick={this.onAddBtnClick}>
					<FormattedMessage id="addAvailabilityButtonLabel" defaultMessage="Add" />
				</button>
				<ul style={availabilityListStyle}>
					{this.state.availabilitiesList.map((availability, id) =>
						<li key={id}>
							<label htmlFor="availabilityFrom" style={availabilityStyle}>
									<FormattedMessage id="availabilityFromLabel" defaultMessage="From" />
							</label>
							<input type="date" ref="availabilityFrom" id="availabilityFrom" style={this.inputStyle('availabilityFrom')} />
							<label htmlFor="availabilityTo">
									<FormattedMessage id="availabilityToLabel" defaultMessage=" To " />
							</label>
							<input type="date" ref="availabilityTo" id="availabilityTo" style={this.inputStyle('availabilityTo')} />
							<button id={id} type="button" onClick={this.onDeleteBtnClick.bind(this, id)}>
								<FormattedMessage id="removeAvailabilityButtonLabel" defaultMessage="x" />
							</button>
						</li>
					)
				}
				</ul>
			</div>

		);
	}

	inputStyle(fieldName) {
		let style = {
			border: '1px solid black',
			borderRadius: '3px'
		};
	}
}

export default AvailabilityList;
