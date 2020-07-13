import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { SocialIcon } from 'react-native-elements';
import firebase from 'firebase';
import { facebookConfig } from "../config";
import { newUser } from '../promises';

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

    onSignInGoogle = googleUser => {
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
                    .then(res => {
                        if (res.additionalUserInfo.isNewUser) {
                            console.log(googleUser.user.email)
                            newUser({email: googleUser.user.email})
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    })
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
                this.onSignInGoogle(result);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    };

    signInWithFacebookAsync = async () => {
        const appId = facebookConfig.appId;
        try {
            await Facebook.initializeAsync('1473322566207048');
            const {
                type,
                token
            } = await Facebook.logInWithReadPermissionsAsync({
                appId,
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                firebase.auth().signInWithCredential(credential)
                    .then(res => {
                        if (res.additionalUserInfo.isNewUser) {
                            console.log(res.user.email);
                            newUser({email: res.user.email})
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
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
                    <SocialIcon
                        title={"Sign In With Facebook"}
                        button
                        type={"facebook"}
                        style={{ padding: '3%'}}
                        onPress={this.signInWithFacebookAsync}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}