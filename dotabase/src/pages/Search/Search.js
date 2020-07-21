import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button, Share, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Search extends React.Component {

    state = {
        search: '',
        data: [],
        matchedHeroes: [],
        loaded: false
    };

    updateSearch = (search) => {
        this.setState({ search });
        this.fetchHero(search);
    };

    async componentDidMount() {
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            const response = await fetch('https://api.opendota.com/api/heroes');
            const json = await response.json();
            this.setState({data: json}, this.initArray);
        } catch(err) {
            console.log("Error fetching data", err);
        }
    }
    
    initArray(){
        this.state.data.some((hero) => {
            let heroName = hero.name.charAt(14).toUpperCase() + hero.name.slice(15);
            heroName = heroName.replace(/_/g, " ");
            this.state.matchedHeroes.push(heroName);
        }); 
        this.setState({loaded:true});
        
    }

    fetchHero(search){
        this.state.matchedHeroes = []; //empty array
        let searchHero = search.toLowerCase().replace(/ /g,"_");
        this.state.data.some((hero) => {
            if (hero.name.startsWith(searchHero, 14)){
                let heroName = hero.name.charAt(14).toUpperCase() + hero.name.slice(15);
                heroName = heroName.replace(/_/g, " ");
                this.state.matchedHeroes.push(heroName);
            }
        }); 
    }

    toHeroProfile(){
        this.props.navigation.navigate('HeroProfile');
    }

    render() {
        if(this.state.loaded){
            return(
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.header}>Search Hero</Text>
                    </View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    />
                    <FlatList data={this.state.matchedHeroes} keyExtractor = {(x,i)=>i.toString()} renderItem = {({item}) =>
                    <Text style={styles.flatList}>{`${item}`}
                    
                    </Text>} />
                    <View><Button onPress={this.toHeroProfile.bind(this)} title="To Hero Profile"/></View>
                </View>
            )
        } else {
            return (
                <View>
                    <View style={styles.title}>
                        <Text style={styles.header}>Loading...</Text>
                    </View>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 34
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginTop: 50,
        marginBottom: 20,
        fontSize: 25,
    },
    flatList:{
        paddingLeft: 15, 
        marginTop:15, 
        paddingBottom:15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth:1
    }
});
