import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyBr5QOqtaSUiU0J6v4hir9pzWaXwxPemdU",
        authDomain: "crwn-db-c6eeb.firebaseapp.com",
        databaseURL: "https://crwn-db-c6eeb.firebaseio.com",
        projectId: "crwn-db-c6eeb",
        storageBucket: "",
        messagingSenderId: "403518820231",
        appId: "1:403518820231:web:ae61ccb53bad02475f8d22"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        console.log(snapShot);

        if (!snapShot.exists) {
                const { displayName, email } = userAuth;
                const createdAt = new Date();

                try {
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        })
                } catch (err) {
                        console.log('error creating user', err.message);
                }
        }

        return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;