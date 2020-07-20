import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Overview extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ marginTop: 50, fontSize: 25 }}>Overview</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});