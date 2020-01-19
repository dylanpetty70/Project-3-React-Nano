import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Foundation } from '@expo/vector-icons';

class QuizView extends Component {

	constructor(props){
		super(props);
		var temp = 0;
		for (var i = 0; i < this.props.decks.length; i++){
			if(this.props.decks[i].name === this.props.navigation.getParam('name')){
				temp = i;
			}
		}
		var temp1 = [];
		for(var i = 0; i < this.props.decks[temp].cards.length; i++){
			temp1[i] = ('Incorrect');
		}
		this.state = {index: temp, toggle: 'Question', card: 0, correct: temp1};
		this.onPressPrev = this.onPressPrev.bind(this);
		this.onPressNext = this.onPressNext.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleCorr = this.toggleCorr.bind(this);
		this.percentage = this.percentage.bind(this);
		this.restartView = this.restartView.bind(this);
		this.deckView = this.deckView.bind(this);
	}

	onPressPrev(){
		(this.state.card !== 0) ?
		this.setState({index: this.state.index, toggle: 'Question', card: this.state.card-1, correct: this.state.correct}) :
		alert("You're on the first card");
	}

	onPressNext(){
		(this.props.decks[this.state.index].cards.length > this.state.card + 1) ?
		this.setState({index: this.state.index, toggle: 'Question', card: this.state.card+1, correct: this.state.correct}) :
		alert('No More Cards');
	}

	toggle(){
		(this.state.toggle === 'Question') ? 
		this.setState({index: this.state.index, toggle: 'Answer', card: this.state.card, correct: this.state.correct}) :
		this.setState({index: this.state.index, toggle: 'Question', card: this.state.card, correct: this.state.correct});
	}

	toggleCorr(){
		let temp = this.state.correct;
		if(this.state.correct[this.state.card] === 'Incorrect'){
			temp[this.state.card] = 'Correct';
		} else{
			temp[this.state.card] = 'Incorrect';
		}
		this.setState({index: this.state.index, toggle: this.state.toggle, card: this.state.card, correct: temp})
	}

	percentage(){
		let total = this.state.correct.length;
		let count = 0;
		for(var i = 0; i < total; i++){
			if(this.state.correct[i] === 'Correct'){
				count = count + 1;
			}
		}
		return Math.floor(count/total * 100);
	}

	restartView(){
		var temp = [];
		for(var i = 0; i < this.props.decks[this.state.index].cards.length; i++){
			temp[i] = ('Incorrect');
		}
		this.setState({index: this.state.index, toggle: 'Question', card: 0, correct: temp})
	}

	deckView(){
		this.props.navigation.pop();
	}


	render(){
		let toggle = 'Question';
		return(
			<View>
				<Text>Card {this.state.card + 1} Out of {this.props.decks[this.state.index].cards.length}</Text>
				<Button title='Previous' onPress={() => {this.onPressPrev()}} />	
				<Button title='Next' onPress={() => {this.onPressNext()}} />
				<Button title={this.state.correct[this.state.card]} onPress={() => {this.toggleCorr()}} />
					
				{(this.state.toggle === 'Question') ?
					<TouchableOpacity onPress={() => {this.toggle()}}>
					<Text>{this.props.decks[this.state.index].cards[this.state.card].question}</Text>
					<Text> Show Answer </Text>
					</TouchableOpacity>
				:
					<TouchableOpacity onPress={() => {this.toggle()}}>
					<Text>{this.props.decks[this.state.index].cards[this.state.card].answer}</Text>
					<Text> Show Question </Text>
					</TouchableOpacity>
				}

				{(this.props.decks[this.state.index].cards.length === this.state.card + 1 & this.state.toggle === 'Answer') ?
					<View>
						<Text>Percentage Correct: {this.percentage()}%</Text>
						<Button title='Restart Quiz' onPress={() => {this.restartView()}} />
						<Button title='Deck View' onPress={() => {this.deckView()}} />
					</View>
				: 
					<View>
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

export default connect(mapStateToProps)(QuizView);