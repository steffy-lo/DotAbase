import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { SocialIcon } from 'react-native-elements';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential)
                    .catch(function(error) {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    const credential = error.credential;
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    };

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                androidClientId: '434622087724-0v9apn7jnfilfdp59vbq6bhbhh9oic0b.apps.googleusercontent.com',
                iosClientId: '434622087724-tl6g83qdjis9p5soj72kbla9lmn9r8sv.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignIn(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity>
                    <SocialIcon
                        title={"Sign In With Google"}
                        button={true}
                        type={"google"}
                        style={{ padding: '3%'}}
                        onPress={this.signInWithGoogleAsync}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}