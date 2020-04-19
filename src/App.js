import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const hatsPage = () => (
	<div>
		<h1>Hats Page</h1>
	</div>
);

function App() {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/shop/hats' component={hatsPage} />
			</Switch>
		</div>
	);
}

export default App;
