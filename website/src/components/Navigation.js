import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../actions';
import { FormattedMessage } from 'react-intl';

let liStyle = {
	display: "inline"
};
let activeStyle = {
	color: "white"
};

/**
 * Navigation menu.
 *
 * Displays menu items according to `this.props.links`, which is an object like
 * this:
 *
 * {
 *     'Menu Item 1': '/url/to/somewhere',
 *     'Menu Item 2': '/url/to/somewhere/else',
 * }
 * 
 * In addition to this, a login/logout menu item is displayed as the last item,
 * depending on the value of `state.isAuthenticated`.
 */
class Navigation extends Component {
	render() {
		let navStyle = {
			backgroundColor: "#333",
			paddingLeft: "15px",
			paddingRight: "15px",
			marginTop: "-20px"
		};
		let ulStyle = {
			listStyle: "none",
			margin: "0",
			padding: "0"
		};

		return (
			<nav style={navStyle} className="Navigation">
				<ul style={ulStyle}>
					{Object.entries(this.props.links).map(([text, url], i)=>{
						return (
							<li style={liStyle} key={i}>
								<NavLink to={url} activeStyle={activeStyle} exact={true}>{text}</NavLink>
							</li>
						);
					})}
					{this.logInOutLink()}
				</ul>
			</nav>
		);
	}

	logInOutLink() {
		if (this.props.isAuthenticated) {
			return (<li style={liStyle}><a href="" onClick={(event) => this.handleLogoutClick(event)}>
									<FormattedMessage id="logout" defaultMessage="Log out" /></a></li>)
		} else {
			return (
				<li style={liStyle}>
					<NavLink to={this.props.loginPageURL} activeStyle={activeStyle} exact={true}>
							<FormattedMessage id="login" defaultMessage="Log in" /></NavLink>
				</li>
			)
		}
	}

	handleLogoutClick(event) {
		event.preventDefault();
		this.props.onLogoutClick();
	}
}

Navigation.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	loginPageURL: PropTypes.string.isRequired,
	onLogoutClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.isAuthenticated,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onLogoutClick: credentials => dispatch(logout())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navigation);
