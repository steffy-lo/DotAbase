import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import { loadUserData } from "../actions";

class Profile extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name={'users'} size={30} color={tintColor} />
        )
    };

    componentDidMount() {
        const email = this.props.email;
        const provider = this.props.provider;
        this.props.loadUserData({email: email, provider: provider})
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Profiles</Text>
                    <View style={styles.row}>
                        <View style={[styles.element, styles.container, {flex: 1}]}>
                            <TouchableOpacity style={styles.container}>
                                <Icon name={'user-plus'} size={45} color={'white'}/>
                                <Text style={styles.white}>Add Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.element, styles.container, {flex: 1}]}>
                            <TouchableOpacity style={styles.container}>
                                <Icon name={'user'} size={45} color={'white'}/>
                                <Text style={styles.white}>My Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.element, styles.container]}>
                            <TouchableOpacity style={styles.container}>
                                <Icon name={'user'} size={45} color={'white'}/>
                                <Text style={styles.white}>User 1</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.element, styles.container]}>
                            <TouchableOpacity style={styles.container}>
                                <Icon name={'user'} size={45} color={'white'}/>
                                <Text style={styles.white}>User 2</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.element, styles.container]}>
                            <TouchableOpacity style={styles.container}>
                                <Icon name={'user'} size={45} color={'white'}/>
                                <Text style={styles.white}>User 3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.element, styles.container]}>
                            <TouchableOpacity style={styles.container}>
                                <Icon name={'user'} size={45} color={'white'}/>
                                <Text style={styles.white}>User 4</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    row: {
        padding: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    element: {
        width: 120,
        height: 120,
        backgroundColor: '#26a69a',
        padding: '3%',
        margin: '2%',
    },
    header: {
        marginTop: 50,
        fontSize: 25
    },
    white: {
        color: 'white'
    }
});

const mapStateToProps = state => {
    return {
        email: state.email,
        provider: state.provider
    }
};

export default connect(mapStateToProps, { loadUserData })(Profile);