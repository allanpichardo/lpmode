import React from 'react';
import ReactDOM from 'react-dom';
import './lpmode.css';
import registerServiceWorker from './registerServiceWorker';
import LpMode from "./components/LpMode";

ReactDOM.render(<LpMode />, document.getElementById('root'));
registerServiceWorker();
