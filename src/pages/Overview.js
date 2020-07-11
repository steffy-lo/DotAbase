import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Overview extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name={'bar-chart'} size={30} color={tintColor} />
        )
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginTop: 50, fontSize: 25 }}>Overview</Text>
            </View>
        );
    }
}