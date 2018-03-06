import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attemptLogin } from '../actions';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { attemptFetchCompetences } from '../actions';

let errMsgStyle = {
	color: '#ce1717',
	fontSize: '0.8em'
};

let availabilityStyle = {
	marginRight: '5px'
};

class CompetencesForm extends Component {

	constructor(props) {
		super(props)
		this.state = {competencesList: []};
		this.onAddBtnClick = this.onAddBtnClick.bind(this);
		this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
	}

	onAddBtnClick(event) {
				event.preventDefault()
			 	const competencesList = this.state.competencesList;
			 	this.setState({
					 competencesList: competencesList.concat(
						{
							competence: "",
						}
					)
			 });
	 }

	 onDeleteBtnClick(id, event) {
				  event.preventDefault()
				  var competencesList = this.state.competencesList;
					competencesList.splice(id, 1)
				  this.setState({
							competencesList
					});
		}

	render() {
		let competencesListListStyle = {
			listStyleType: 'none'
		}

		return (
			<div>
				<FormattedMessage id="competenceMessageLabel" defaultMessage="Competences " />
				<button type="button" onClick={this.onAddBtnClick}>
					<FormattedMessage id="addCompetenceButtonLabel" defaultMessage="+" />
				</button>
				<ul style={competencesListListStyle}>
					{this.state.competencesList.map((competences, id) =>
						<li key={id}>
              <select name="competences">
								{this.props.comptences.map((competence, id) =>
									<option key={competence.id}>{competence.name}</option>
								)}
              </select>
							<button id={id} type="button" onClick={this.onDeleteBtnClick.bind(this, id)}>
								<FormattedMessage id="removeCompetenceButtonLabel" defaultMessage="x" />
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

	componentDidMount() {
		this.props.onRender();
	}
}

CompetencesForm.propTypes = {
	competences: PropTypes.array.isRequired,
	onRender: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	competences: state.competences
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
