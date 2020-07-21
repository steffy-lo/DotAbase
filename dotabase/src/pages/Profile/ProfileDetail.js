import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";

class ProfileDetail extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Profile Detail</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginTop: 50,
        fontSize: 25
    }
});

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(ProfileDetail);