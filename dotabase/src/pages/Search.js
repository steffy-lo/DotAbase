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
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icon name={'search'} size={30} color={tintColor} />
        )
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
            this.setState({data: json, loaded: true});
        } catch(err) {
            console.log("Error fetching data", err);
        }
    }

    fetchHero(search){
        this.state.matchedHeroes = []; //empty array
        let searchHero = search.toLowerCase().replace(/ /g,"_");;
        this.state.data.some((hero) => {
            if (hero.name.startsWith(search, 14)){
                let heroName = hero.name.charAt(14).toUpperCase() + hero.name.slice(15);
                heroName = heroName.replace("_", " ");
                this.state.matchedHeroes.push(heroName);
            }
        }); 
    }

    render() {
        if(this.state.loaded){
            return(
                <View>
                    <Text style={{ marginTop: 50, marginLeft: 15, fontSize: 25 }}>Search Hero</Text>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}   
                    />
                    <FlatList data={this.state.matchedHeroes} keyExtractor = {(x,i)=>i} renderItem = {({item}) =>
                    <Text style={{marginLeft: 15}}>{`${item}`}</Text>} />
                </View>
                
            )
        }else{
            return (
                <View>
                    <Text style={{ marginTop: 50, marginLeft: 15,fontSize: 25 }}>Loading Hero</Text>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
