import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
//import 'styles/base.scss';
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import 'scss/style.scss';
// Temp fix for reactstrap
import 'scss/core/_dropdown-menu-right.scss';

ReactDOM.render(<Root />, document.getElementById('root'));
// registerServiceWorker();
