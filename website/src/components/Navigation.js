import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import './Navigation.css';

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
		let liStyle = {
			display: "inline"
		};
		let activeStyle = {
			color: "white"
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
				</ul>
			</nav>
		);
	}
}
export default Navigation;
