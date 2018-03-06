import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';
import fi from 'react-intl/locale-data/fi';

addLocaleData(en);
addLocaleData(sv);
addLocaleData(fi);

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

ReactDOM.render(
	<Root store={store} />
, document.getElementById('root'));
registerServiceWorker();
