import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyD4QWW9Hvh1KTCM4j5qvJYPIkkCU_opkrk',
	authDomain: 'crown-db-6377c.firebaseapp.com',
	databaseURL: 'https://crown-db-6377c.firebaseio.com',
	projectId: 'crown-db-6377c',
	storageBucket: 'crown-db-6377c.appspot.com',
	messagingSenderId: '898973337877',
	appId: '1:898973337877:web:3bee6f3baad6eb33be811c',
	measurementId: 'G-5RZZ04Q0PG',
};

export const createUserProfileDocument = async (
	userAuth,
	additionalData
) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log(
				'something went wrong while creating an user',
				error.message
			);
		}
	}
	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
