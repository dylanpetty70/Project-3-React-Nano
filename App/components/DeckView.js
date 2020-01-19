import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Button, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { handleDeleteDeck } from '../actions/index';

class DeckView extends Component {

	constructor(props){
		super(props);
		var temp = 0;
		for (var i = 0; i < this.props.decks.length; i++){
			if(this.props.decks[i].name === this.props.navigation.getParam('name')){
				temp = i;
			}
		}
		this.state = {index: temp};
		this.addCard = this.addCard.bind(this);
		this.startQuiz = this.startQuiz.bind(this);
		this.deleteDeck = this.deleteDeck.bind(this);
	}

	componentDidUpdate = (prevProps) => {
		if(this.props.decks[this.state.index].cards.length !== prevProps.decks[this.state.index].cards.length ) {
			var temp = 0;
			for (var i = 0; i < this.props.decks.length; i++){
				if(this.props.decks[i].name === this.props.navigation.getParam('name')){
					temp = i;
				}
			}
		    this.setState({index: temp})
	    };
	};

	addCard(){
		this.props.navigation.push('AddCardView', {name: this.props.navigation.getParam('name')});
	}

	startQuiz(){
		(this.props.decks[this.state.index].cards.length > 0) ?
		this.props.navigation.navigate('QuizView', {name: this.props.navigation.getParam('name')}) :
		alert('You Have No Cards To Quiz With');
	}

	deleteDeck(){
		var temp = [];
		for(var i = 0; i < this.props.decks.length; i++){
			if(this.props.decks[i].name === this.props.navigation.getParam('name')){
				
			} else{
				temp.push(this.props.decks[i]);
			}
		}
		this.props.handleDeleteDeck(temp);
		this.props.navigation.pop();
	}


	render(){
		return(
			<View>
			{(typeof this.props.decks[this.state.index] != "undefined") ? 
			<View>
			<View>
				<Text style={{fontSize: 24, textAlign: 'center'}}>{this.props.decks[this.state.index].name}</Text>
				<Text style={{fontSize: 12, textAlign: 'center'}}>{this.props.decks[this.state.index].cards.length} Cards</Text>
			</View>
			<View>
				<Button title="Add Card" onPress={() =>this.addCard()} />
				<Button title="Start Quiz" onPress={() =>this.startQuiz()} />
				<TouchableOpacity onPress={() => this.deleteDeck()}>
					<Text style={{fontSize: 12, textAlign: 'center'}}>Delete Deck</Text>
				</TouchableOpacity>
			</View> 
			</View>
			:
			<View>
			<Text> Deck Doesn't Exist </Text>
			</View>
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

export default connect(mapStateToProps, { handleDeleteDeck })(DeckView);