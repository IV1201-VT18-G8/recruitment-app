import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { attemptFetchCompetences } from '../actions';
import ErrorMessage, { errMsgStyle } from './ErrorMessage';
import messages from '../messages';
import { getLanguage } from '../utils';
import { inputStyle, invalidInputStyle } from '../consts.js';

class CompetencesForm extends Component {

	constructor(props) {
		super(props)
		this.state = {competenceProfiles: []};
		this.onAddBtnClick = this.onAddBtnClick.bind(this);
		this.lang = getLanguage();
	}

	componentDidMount() {
		this.props.onRender();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.applicantSelf.competences
				&& Object.keys(nextProps.applicantPatchErrors).length === 0
				&& !nextProps.isPatchingApplicant) {
			this.setState({competenceProfiles: nextProps.applicantSelf.competences})
		}
	}

	handleInputChanged(field, row, event) {
		let competenceProfiles = this.state.competenceProfiles;
		competenceProfiles[row][field] = event.target.value ? JSON.parse(event.target.value) : ""
		this.setState({ competenceProfiles });
		this.props.onChange(competenceProfiles);
	}

	onAddBtnClick(event) {
		event.preventDefault();
		let competenceProfiles = this.state.competenceProfiles.concat({
			competence: '',
			experience: '',
		});
		this.setState({ competenceProfiles });
		this.props.onChange(competenceProfiles);
	}

	onDeleteBtnClick(row, event) {
		event.preventDefault();
		let competenceProfiles = this.state.competenceProfiles;
		competenceProfiles.splice(row, 1);
		this.setState({ competenceProfiles });
		this.props.onChange(competenceProfiles);
	}

	render() {
		let componentStyle = {
			marginTop: '20px',
			marginBottom: '20px'
		}
		let labelStyle = {
			marginRight: '20px',
		}

		return (
			<div style={componentStyle}>
				<span style={labelStyle}>
					<FormattedMessage id="competences" defaultMessage="Competences" />
				</span>
				<button type="button" onClick={this.onAddBtnClick}>
					+
				</button>
				{this.renderErrors('detail')}
				{this.renderCompetences()}
			</div>
		);
	}

	renderCompetences() {
		if (this.state.competenceProfiles.length === 0
				&& Object.keys(this.props.competencesFetchErrors).length === 0) {
			return (
				<p><FormattedMessage id="noCompetences" defaultMessage="'No competence choices." /></p>
			)
		}
		return this.renderTable()
	}

	renderTable() {
		if (!this.state.competenceProfiles || this.state.competenceProfiles.length === 0) {
			return
		}

		return (
			<table>
				<thead>
					<tr>
						<th></th>
						<th><FormattedMessage id="yearsOfExperience" defaultMessage="Years of experience" /></th>
						<th><FormattedMessage id="delete" defaultMessage="Delete" /></th>
					</tr>
				</thead>
				<tbody>
					{this.state.competenceProfiles.map((competences, row) =>
						<tr key={row}>
							<td>
								<select
									name="competences"
									onChange={this.handleInputChanged.bind(this, 'competence', row)}
									style={this.inputStyle(row, 'competence')}
								>
									<option
										value=""
										selected={this.state.competenceProfiles[row].competence === "" ? true : false}
										required
									>
										{messages[this.lang].selectCompetence}
									</option>
									{this.props.competences.map((competence, key) =>
										<option
											key={key}
											value={competence.id}
											selected={competence.id === this.state.competenceProfiles[row].competence ? true : false}
										>
											{competence.name}
										</option>
									)}
								</select>
							</td>
							<td>
								<input
									type="number"
									min="0"
									max="200"
									id="experience"
									value={this.state.competenceProfiles[row].experience}
									onChange={this.handleInputChanged.bind(this, 'experience', row)}
									style={this.inputStyle(row, 'experience')}
									required
								/>
							</td>
							<td>
								<button type="button" data-row={row} onClick={this.onDeleteBtnClick.bind(this, row)}>
									x
								</button>
							</td>
							<td>
								{this.errorP(row, 'competence')}
								{this.errorP(row, 'experience')}
							</td>
						</tr>
					)
				}
			</tbody>
		</table>
		)
	}

	renderErrors(fieldName) {
		if (!this.props.competencesFetchErrors[fieldName]) {
			return
		}
		return (
			<ErrorMessage>{this.props.competencesFetchErrors[fieldName]}</ErrorMessage>
		)
	}

	inputStyle(row, fieldName) {
		if (!this.props.applicantPatchErrors.competences
				|| !this.props.applicantPatchErrors.competences[row]
				|| !this.props.applicantPatchErrors.competences[row][fieldName]) {
			return inputStyle
		}
		return {...inputStyle, ...invalidInputStyle}
	}

	errorP(row, fieldName) {
		if (!this.props.applicantPatchErrors.competences
				|| !this.props.applicantPatchErrors.competences[row]
				|| !this.props.applicantPatchErrors.competences[row][fieldName]) {
			return
		}
		const error = this.props.applicantPatchErrors.competences[row][fieldName];
		return (<p style={errMsgStyle}>{error}</p>)
	}
}

CompetencesForm.propTypes = {
	competences: PropTypes.array.isRequired,
	competencesFetchErrors: PropTypes.object.isRequired,
	applicantPatchErrors: PropTypes.object.isRequired,
	applicantSelf: PropTypes.object.isRequired,
	onRender: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	competences: state.competences,
	competencesFetchErrors: state.competencesFetchErrors,
	applicantSelf: state.applicantSelf,
	applicantPatchErrors: state.applicantPatchErrors,
});

const mapDispatchToProps = dispatch => {
	return {
		onRender: () => dispatch(attemptFetchCompetences())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CompetencesForm);
