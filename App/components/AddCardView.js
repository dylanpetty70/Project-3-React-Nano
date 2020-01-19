import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, TextInput } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { handleAddCard } from '../actions/index';

class AddCardView extends Component {

	constructor(props){
		super(props);
		this.state = {question: '', answer: ''}
		this.onPress = this.onPress.bind(this);
		this.onChangeQues = this.onChangeQues.bind(this);
		this.onChangeAns = this.onChangeAns.bind(this);
	}

	onChangeQues(text){
		this.setState({question: text, answer: this.state.answer})
	}

	onChangeAns(text){
		this.setState({question: this.state.answer, answer: text})
	}

	onPress(){
		var temp = 0;
		for(var i = 0; i < this.props.decks.length; i++){
			if(this.props.decks[i].name === this.props.navigation.getParam('name')){
				temp = i;
			}
		}
		this.props.handleAddCard([{question: this.state.question, answer: this.state.answer}], temp);
		this.props.navigation.pop();
	}


	render(){
		return(
			<View>
			<View>
				<TextInput placeholder='Question' onChangeText={(text) => this.onChangeQues(text)}/>
				<TextInput placeholder='Answer' onChangeText={(text) => this.onChangeAns(text)}/>
			</View>
			<View>
				<Button title="Submit" onPress={() => this.onPress()} />
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

export default connect(mapStateToProps, {handleAddCard})(AddCardView);