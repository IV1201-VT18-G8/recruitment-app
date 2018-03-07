import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptFetchApplicantSelf, attemptPatchApplicant } from '../actions';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AvailabilitiesForm from './AvailabilitiesForm';
import CompetencesForm from './CompetencesForm';
import ErrorMessage, { errMsgStyle } from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { inputStyle, invalidInputStyle } from '../consts.js';

class ApplicationForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			first_name: '',
			last_name: '',
			social_security_number: '',
			email: '',
			availabilities: [],
			competences: [],
		}
		this.handleAvailabilitiesChanged = this.handleAvailabilitiesChanged.bind(this);
		this.handleCompetencesChanged = this.handleCompetencesChanged.bind(this);
	}

	componentDidMount() {
		this.props.onRender();
	}

	handleInputChanged(field, event) {
		this.setState({[field]: event.target.value});
	}

	handleAvailabilitiesChanged(availabilities) {
		this.setState({ availabilities })
	}

	handleCompetencesChanged(competences) {
		this.setState({ competences })
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.applicantSelf).length !== 0
				&& Object.keys(nextProps.applicantPatchErrors).length === 0
				&& !nextProps.isPatchingApplicant) {
			this.setState({
				first_name: nextProps.applicantSelf.first_name,
				last_name: nextProps.applicantSelf.last_name,
				social_security_number: nextProps.applicantSelf.social_security_number,
				email: nextProps.applicantSelf.email,
				availabilities: nextProps.applicantSelf.availabilities,
				competences: nextProps.applicantSelf.competences,
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onFormSubmit(this.props.user_id, this.state);
	}

	render() {
		let labelStyle = {
			marginBottom: '5px',
			display: 'block'
		};

		return (
			<form onSubmit={(event) => this.handleSubmit(event)}>
				{this.renderApplicantFetchErrors('request')}
				<p>
					<label htmlFor="firstName" style={labelStyle}>
							<FormattedMessage id="firstName" defaultMessage="First name" />
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={this.state.first_name}
						onChange={this.handleInputChanged.bind(this, 'first_name')}
						style={this.inputStyle('first_name')}
						required
					/>
					{this.errorSpan('first_name')}
				</p>
				<p>
					<label htmlFor="surname" style={labelStyle}>
							<FormattedMessage id="lastName" defaultMessage="Last name" />
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={this.state.last_name}
						onChange={this.handleInputChanged.bind(this, 'last_name')}
						style={this.inputStyle('last_name')}
						required
					/>
					{this.errorSpan('last_name')}
				</p>
				<p>
					<label htmlFor="socialSecurityNumber" style={labelStyle}>
							<FormattedMessage id="socialSecurityNumber" defaultMessage="Social security number" />
					</label>
					<input
						type="text"
						id="socialSecurityNumber"
						name="socialSecurityNumber"
						value={this.state.social_security_number}
						onChange={this.handleInputChanged.bind(this, 'social_security_number')}
						style={this.inputStyle('social_security_number')}
						required
					/>
					{this.errorSpan('social_security_number')}
				</p>
				<p>
					<label htmlFor="emailAdress" style={labelStyle}>
							<FormattedMessage id="emailAddress" defaultMessage="Email address" />
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={this.state.email}
						onChange={this.handleInputChanged.bind(this, 'email')}
						style={this.inputStyle('email')}
						required
					/>
					{this.errorSpan('email')}
				</p>
				<AvailabilitiesForm onChange={this.handleAvailabilitiesChanged} />
				<CompetencesForm onChange={this.handleCompetencesChanged}/>
				<button type="submit">
					<FormattedMessage id="submit" defaultMessage="Apply" />
				</button>
				{this.renderSubmitErrors('request')}
				{this.props.applicantPatchSuccess ? <SuccessMessage><FormattedMessage id="applicationUpdated" defaultMessage="Your application has been updated." /></SuccessMessage> : null}
			</form>
		);
	}

	renderApplicantFetchErrors(fieldName) {
		if (!this.props.applicantSelfFetchErrors[fieldName]) {
			return
		}
		return (
			<ErrorMessage>{this.props.applicantSelfFetchErrors[fieldName]}</ErrorMessage>
		)
	}

	renderSubmitErrors(fieldName) {
		if (!this.props.applicantPatchErrors[fieldName]) {
			return
		}
		return (
			<ErrorMessage>{this.props.applicantPatchErrors[fieldName]}</ErrorMessage>
		)
	}

	inputStyle(fieldName) {
		const error = this.props.applicantPatchErrors[fieldName];
		return error ? {...inputStyle, ...invalidInputStyle} : inputStyle;
	}

	errorSpan(fieldName) {
		const error = this.props.applicantPatchErrors[fieldName];
		return error ? (<span style={errMsgStyle}><br />{error}</span>): null;
	}
}

ApplicationForm.propTypes = {
	user_id: PropTypes.number.isRequired,
	applicantSelf: PropTypes.object.isRequired,
	applicantSelfFetchErrors: PropTypes.object.isRequired,
	isPatchingApplicant: PropTypes.bool.isRequired,
	applicantPatchSuccess: PropTypes.bool.isRequired,
	applicantPatchErrors: PropTypes.object.isRequired,
	onFormSubmit: PropTypes.func.isRequired,
	onRender: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	user_id: state.user_id,
	applicantSelf: state.applicantSelf,
	applicantSelfFetchErrors: state.applicantSelfFetchErrors,
	isPatchingApplicant: state.isPatchingApplicant,
	applicantPatchSuccess: state.applicantPatchSuccess,
	applicantPatchErrors: state.applicantPatchErrors,
});

const mapDispatchToProps = dispatch => {
	return {
		onRender: () => dispatch(attemptFetchApplicantSelf()),
		onFormSubmit: (id, data) => dispatch(attemptPatchApplicant(id, data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm);
