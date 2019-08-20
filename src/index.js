import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import router from './routers/router';
import rootReducer from './store/reducers';

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>  
	   <BrowserRouter>
	 	  {renderRoutes(router)}
	   </BrowserRouter>
	</Provider>
	,document.getElementById('root')
);
serviceWorker.unregister();


