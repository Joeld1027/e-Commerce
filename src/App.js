import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/signin-up/signin-up.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import { selectCurrentUser } from './redux/user/user.selectors';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import {
	auth,
	createUserProfileDocument,
} from './firebase/firebase.utils';
import './App.css';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			}
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route exact path='/checkout' component={CheckoutPage} />
					<Route
						exact
						path='/signin'
						render={() =>
							this.props.currentUser ? (
								<Redirect to='/' />
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
