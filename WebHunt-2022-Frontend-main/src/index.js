import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import './initializeFirebase.js';
import rootReducer from './reducers/rootReducer';
import Webhunt from './webhunt';


const store=createStore(rootReducer,composeWithDevTools());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
		  <Webhunt />
		</Provider >
	</React.StrictMode>,
	document.getElementById('root')
);
