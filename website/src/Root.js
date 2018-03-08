import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { getLanguage } from './utils';
import { IntlProvider } from 'react-intl';
import messages from './messages';

/**
 * Provides Redux state and i18n wrappers for App.
 */
class Root extends Component {
	render() {
		let lang = getLanguage()
		return (
			<Provider store={this.props.store}>
				<IntlProvider locale={lang} messages={messages[lang]}>
					<Router>
						<Route path="/" component={App} />
					</Router>
				</IntlProvider>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;
