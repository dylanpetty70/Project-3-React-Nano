import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, TextInput, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import {handleAddDeck} from '../actions/index';

class AddDeck extends Component {	

	constructor(props){
		super(props);
		this.state = {name: ''}
		this.onPress = this.onPress.bind(this);
	}

	onPress(){
		let flag = true;
		for(var i = 0; i < this.props.decks.length; i++){
			if(this.props.decks[i].name === this.state.name){
				flag = false;
			}
		}
		if(flag){
			this.props.handleAddDeck({name: this.state.name, cards: []});
			this.props.navigation.push('DeckView', {name: this.state.name})
		}
		else{
			alert('Deck Already Exists');
		}
	}


	render(){
		return(
			<View>
			<View>
				<Text>What is the title of your new deck?</Text>
				<TextInput placeholder='Deck Title' onChangeText={(text) => this.setState({name: text})} />
			</View>
			<View>
				<Button title='Create Deck' onPress={() => this.onPress()} />
			</View>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return{
		decks: state.decks
	}
}

export default connect(mapStateToProps, {handleAddDeck})(AddDeck);