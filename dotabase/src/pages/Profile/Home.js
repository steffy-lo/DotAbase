import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { loadUserData } from "../../actions";
import Icon from "react-native-vector-icons/FontAwesome";

class Profiles extends React.Component {

    constructor(props) {
        super(props);
        this.openProfile = this.openProfile.bind(this);

    }

    componentDidMount() {
        const email = this.props.email;
        const provider = this.props.provider;
        this.props.loadUserData({email: email, provider: provider});
    }

    openProfile() {
        if (this.props.user.my_profile == null) {
            this.props.navigation.navigate('SearchProfiles')
        } else {
            this.props.navigation.navigate('ProfileDetail')
        }
    }

    render() {
        const profiles = this.props.user["profiles"].map(prof => {
            return (
                <View key={prof} style={[styles.element, styles.container]}>
                    <TouchableOpacity style={styles.container}>
                        <Icon name={'user'} size={45} color={'white'}/>
                        <Text style={styles.white}>{prof.username}</Text>
                    </TouchableOpacity>
                </View>
            )
        });
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>Profiles</Text>
                    <View style={styles.row}>
                        <View style={[styles.element, styles.container, {flex: 1}]}>
                            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('SearchProfiles')}>
                                <Icon name={'user-plus'} size={45} color={'white'}/>
                                <Text style={styles.white}>Add Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.element, styles.container, {flex: 1}]}>
                            <TouchableOpacity style={styles.container} onPress={this.openProfile}>
                                <Icon name={'user'} size={45} color={'white'}/>
                                <Text style={styles.white}>My Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        {profiles}
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
        provider: state.provider,
        user: state.user
    }
};

export default connect(mapStateToProps, { loadUserData })(Profiles);