import React from "react";
import {
	Route,
	Redirect,
} from "react-router-dom";
import { connect } from 'react-redux';

/**
 * Route that redirects the user to `loginPath` if `state.isAuthenticated` is
 * false. Otherwise renders `component`.
 *
 * Adapted from React Training:
 * https://reacttraining.com/react-router/web/example/auth-workflow
 */
const ProtectedRoute = ({ component: Component, loginPath, isAuthenticated, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: loginPath,
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	)
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.isAuthenticated
	}
}

export default connect(mapStateToProps)(ProtectedRoute);
