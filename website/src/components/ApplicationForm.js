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

class ApplicationForm extends Component {
	render() {
		let formStyle = {};
		let labelStyle = {
			marginBottom: '5px',
			display: 'block'
		};
		let availabilityStyle = {
			marginRight: '5px'
		}
		let availabilityListStyle = {
			listStyleType: 'none'
		}

		return (
			<form style={formStyle} onSubmit={(event) => this.handleSubmit(event)}>
				<p>
					<label htmlFor="firstName" style={labelStyle}>
							<FormattedMessage id="firstNameLabel" defaultMessage="Name" />
					</label>
					<input type="text" ref="firstName" id="firstName" style={this.inputStyle('firstName')}/>
				</p>
				<p>
					<label htmlFor="surname" style={labelStyle}>
							<FormattedMessage id="surnameLabel" defaultMessage="Surname" />
					</label>
					<input type="text" ref="surname" id="surname" style={this.inputStyle('surname')}/>
				</p>
				<p>
					<label htmlFor="dateOfBirth" style={labelStyle}>
							<FormattedMessage id="dateOfBirthLabel" defaultMessage="Date of birth" />
					</label>
					<input type="date" ref="dateOfBirth" id="dateOfBirth" style={this.inputStyle('dateOfBirth')}/>
				</p>
				<p>
					<label htmlFor="emailAdress" style={labelStyle}>
							<FormattedMessage id="emailAdressLabel" defaultMessage="Email" />
					</label>
					<input type="email" ref="emailAdress" id="emailAdress" style={this.inputStyle('emailAdress')} />
				</p>
				<FormattedMessage id="availabilityMessageLabel" defaultMessage="Available " />
				<button type="submit">
					<FormattedMessage id="addAvailabilityButtonLabel" defaultMessage="Add" />
				</button>
				<ul>
					<li>
						<label htmlFor="availabilityFrom" style={availabilityStyle}>
								<FormattedMessage id="availabilityFromLabel" defaultMessage="From" />
						</label>
						<input type="date" ref="availabilityFrom" id="availabilityFrom" style={this.inputStyle('availabilityFrom')} />
						<label htmlFor="availabilityTo">
								<FormattedMessage id="availabilityToLabel" defaultMessage=" To " />
						</label>
						<input type="date" ref="availabilityTo" id="availabilityTo" style={this.inputStyle('availabilityTo')} />
						<button type="submit">
							<FormattedMessage id="removeAvailabilityButtonLabel" defaultMessage="x" />
						</button>
					</li>
				</ul>

				<button type="submit">
					<FormattedMessage id="applyButtonLabel" defaultMessage="Apply" />
				</button>
			</form>
		);
	}

	inputStyle(fieldName) {
		let style = {
			border: '1px solid black',
			borderRadius: '3px'
		};
	}
}

export default ApplicationForm;
