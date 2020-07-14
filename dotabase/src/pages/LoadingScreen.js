import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from "firebase";
import {connect} from "react-redux";
import { userLogin } from "../actions";

class LoadingScreen extends React.Component {

    componentDidMount() {
        this.checkLoggedIn();
    }

    checkLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.userLogin({ email: user.email, provider: user.providerData[0].providerId });
                this.props.navigation.navigate('Dashboard')
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { email, provider } = state;
    return { email, provider }
};

export default connect(mapStateToProps, { userLogin })(LoadingScreen);