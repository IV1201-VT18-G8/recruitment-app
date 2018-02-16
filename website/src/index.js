import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

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
