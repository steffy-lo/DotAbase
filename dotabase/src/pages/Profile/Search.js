import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet, Button, Share, FlatList, ScrollView} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            matchedProfiles: [],
            loaded: false
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch = (query) => {
        this.setState({ query: query });
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.query !== this.state.query) {
            try {
                //Assign the promise unresolved first then get the data using the json method.
                const response = await fetch('https://api.opendota.com/api/search?q=' + this.state.query);
                const json = await response.json();
                this.setState({matchedProfiles: json});
            } catch (err) {
                console.log("Error fetching data", err);
            }
        }
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.header}>Search Profiles</Text>
                </View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.query}
                />
                <FlatList data={this.state.matchedProfiles} keyExtractor={(x,i)=>i.toString()}
                          renderItem={({item}) => {
                              const last_match_time = () => {
                                  if (item.last_match_time !== undefined)
                                      return item.last_match_time.substring(0, 10);
                                  else
                                      return "Unknown"
                              };
                              return (
                                  <View>
                                      <TouchableOpacity style={styles.container}>
                                      <Image
                                          style={{width: 50, height: 50}}
                                          source={{
                                              uri: item.avatarfull,
                                          }}
                                      />
                                      <Text style={styles.flatList}>{item.account_id}</Text>
                                      <Text style={styles.flatList}>{item.personaname}</Text>
                                      <Text style={styles.flatList}>{last_match_time()}</Text>
                                      </TouchableOpacity>
                                  </View>
                              );
                          }
                          }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: '2%'
    },
    header: {
        marginTop: 50,
        marginBottom: 20,
        fontSize: 25
    },
});