import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { inputStyle, invalidInputStyle } from '../consts.js';

let errMsgStyle = {
	color: '#ce1717',
	fontSize: '0.8em'
};

class AvailabilitiesForm extends Component {

	constructor(props) {
		super(props)
		this.state = {availabilitiesList: []};
		this.onAddBtnClick = this.onAddBtnClick.bind(this);
		this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.applicantSelf.availabilities
				&& Object.keys(nextProps.applicantPatchErrors).length === 0
				&& !nextProps.isPatchingApplicant) {
			this.setState({availabilitiesList: nextProps.applicantSelf.availabilities})
		}
	}

	handleInputChanged(field, row, event) {
		let availabilitiesList = this.state.availabilitiesList;
		availabilitiesList[row][field] = event.target.value;
		this.setState({ availabilitiesList });
		this.props.onChange(availabilitiesList);
	}

	onAddBtnClick(event) {
		event.preventDefault()
		let availabilitiesList = this.state.availabilitiesList.concat({
			start: '',
			end: ''
		});
		this.setState({ availabilitiesList });
		this.props.onChange(availabilitiesList)
	}

	onDeleteBtnClick(row, event) {
		event.preventDefault()
		let availabilitiesList = this.state.availabilitiesList;
		availabilitiesList.splice(row, 1)
		this.setState({ availabilitiesList });
		this.props.onChange(availabilitiesList)
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
					<FormattedMessage id="available" defaultMessage="Available" />
				</span>
				<button type="button" onClick={this.onAddBtnClick}>
					+
				</button>
				{this.renderTable()}
			</div>
		);
	}

	renderTable() {
		if (!this.state.availabilitiesList || this.state.availabilitiesList.length === 0) {
			return
		}
		return (
			<table>
				<thead>
					<tr>
						<th><FormattedMessage id="from" defaultMessage="From" /></th>
						<th><FormattedMessage id="to" defaultMessage="To" /></th>
						<th><FormattedMessage id="delete" defaultMessage="Delete" /></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{this.state.availabilitiesList.map((availability, row) =>
						<tr key={row}>
							<td>
								<input
									type="date"
									ref="availabilityFrom"
									id="availabilityFrom"
									value={this.state.availabilitiesList[row].start}
									onChange={this.handleInputChanged.bind(this, 'start', row)}
									style={this.inputStyle(row, 'start')}
								/>
							</td>
							<td>
								<input
									type="date"
									ref="availabilityTo"
									id="availabilityTo"
									value={this.state.availabilitiesList[row].end}
									onChange={this.handleInputChanged.bind(this, 'end', row)}
									style={this.inputStyle(row, 'end')}
								/>
							</td>
							<td>
								<button type="button" onClick={this.onDeleteBtnClick.bind(this, row)}>
									x
								</button>
							</td>
							<td>
								{this.errorP(row, 'start')}
								{this.errorP(row, 'end')}
							</td>
						</tr>
					)
				}
			</tbody>
		</table>
		)
	}

	inputStyle(row, fieldName) {
		if (!this.props.applicantPatchErrors.availabilities
				|| !this.props.applicantPatchErrors.availabilities[row]
				|| !this.props.applicantPatchErrors.availabilities[row][fieldName]) {
			return inputStyle
		}
		return {...inputStyle, ...invalidInputStyle}
	}

	errorP(row, fieldName) {
		if (!this.props.applicantPatchErrors.availabilities
				|| !this.props.applicantPatchErrors.availabilities[row]
				|| !this.props.applicantPatchErrors.availabilities[row][fieldName]) {
			return
		}
		const error = this.props.applicantPatchErrors.availabilities[row][fieldName];
		return (<p style={errMsgStyle}>{error}</p>)
	}
}

AvailabilitiesForm.propTypes = {
	applicantSelf: PropTypes.object.isRequired,
	applicantPatchErrors: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	applicantSelf: state.applicantSelf,
	applicantPatchErrors: state.applicantPatchErrors
});

export default connect(
	mapStateToProps,
)(AvailabilitiesForm);
