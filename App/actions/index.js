export const INITIAL_DATA = 'INITIAL_DATA';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';


function addCard (card, index) {
	return{
		type: ADD_CARD,
		card,
		index
	}
}

export function handleAddCard (card, index){
	return (dispatch) => {
		return dispatch(addCard(card, index));
	}
}

function addDeck (deck) {
	return{
		type: ADD_DECK,
		deck
	}
}

export function handleAddDeck (deck){
	return (dispatch) => {
		return dispatch(addDeck(deck));
	}
}

function deleteDeck(decks){
	return{
		type: DELETE_DECK,
		decks
	}
}

export function handleDeleteDeck(decks){
	return (dispatch) => {
		return dispatch(deleteDeck(decks));
	}
}