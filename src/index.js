import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

/*We wrap the entire app in a BrowserRouter. This just sets up the router to be able to work with all the other components imported. And then it also listens to the URL, and notifies those other components when the URL changes.*/
ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>,
	document.getElementById('root'))