import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Foundation } from '@expo/vector-icons';

class Home extends Component {

	constructor(props){
		super(props);
		this.renderItem = this.renderItem.bind(this);
		this.state = {flag: false};
	}


	renderItem({item}){
		return(
			<TouchableOpacity onPress={() => this.props.navigation.push('DeckView', {name: item.name})}>			
				<Text style={{fontSize: 24, textAlign: 'center'}}>{item.name}</Text>
				<Text style={{fontSize: 12, textAlign: 'center'}}>{item.cards.length} Cards</Text>
			</TouchableOpacity>
		)
	}


	render(){
		

		return(
			<View>			
		{(this.props.decks.length > 0) ?
			<FlatList 
				data={this.props.decks}
				renderItem={this.renderItem}
				keyExtractor={(item) => item.name}
			/>
			:
				<Text>No Decks To Show.</Text>
			}
			</View>
		)
	}
}

const mapStateToProps = state => {
	return{
		decks: state.decks
	}
}

export default connect(mapStateToProps)(Home);