import React, {Component} from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import * as Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './App/reducers';
import DeckView from './App/components/DeckView';
import AddCardView from './App/components/AddCardView';
import QuizView from './App/components/QuizView';
import middleware from './App/middleware/index';
import {AsyncStorage} from 'react-native';
import {Notifications, Permission} from 'expo';

import ScreenHome from './App/components/ScreenHome';
import ScreenAddDeck from './App/components/ScreenAddDeck';



class App extends Component {

    static getDerivedStateFromError(error) {
        return { hasError: true };
     }

     componentDidMount(){
      setLocalNotification();
	 }


	render(){

	const TabScreen = createBottomTabNavigator(
      {
        Home: { 
            screen: ScreenHome,
            },
        AddDeck: { 
            screen: ScreenAddDeck,
            navigationOptions:{
                title: 'New Deck',
              },
            },
      },
      {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#F8F8F8',
          style: {
            backgroundColor: '#633689',
          },
          labelStyle: {
            textAlign: 'center',
          },
          indicatorStyle: {
            borderBottomColor: '#87B56A',
            borderBottomWidth: 2,
          },
        },
      }
    );

    const Nav = createStackNavigator({
      TabScreen: {
        screen: TabScreen,
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#633689',
          },
          headerTintColor: '#FFFFFF',
          title: 'Study Helper'
        },
      },
      DeckView: {
          screen: DeckView,
          navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}`,
	      }),
          navigationOptions: {
              headerStyle: {
                backgroundColor: '#633689',
              },
              headerTintColor: '#FFFFFF'
	      }
      },
        AddCardView: {
          screen: AddCardView,
          navigationOptions: {
              headerStyle: {
                backgroundColor: '#633689',
              },
              headerTintColor: '#FFFFFF',
              title: 'Add Card'
	      }
      },
          QuizView: {
          screen: QuizView,
          navigationOptions: {
              headerStyle: {
                backgroundColor: '#633689',
              },
              headerTintColor: '#FFFFFF',
              title: 'Quiz'
	      }
      },
    });

    const store = createStore(reducer, middleware)
    

    const AppContainer = createAppContainer(Nav);

		return(
		    <Provider store={store}>
                <AppContainer />
            </Provider>
		)
	}
}


export default App;

const NOTIFICATION_KEY = 'NOTIFICATION_KEY';

function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification (){
    return {
        title: 'Study!',
        body: "You haven't studied recently!",
        ios: {
         sound: true,
	    },
        andriod: {
         sound: true,
         priority: 'high',
         sticky: false,
         vibrate: true,
	    }
	}

}

function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Notifications.cancelAllScheduledNotificationsAsync()
                
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                    createNotification(), 
                    {
                        time: tomorrow,
                        repeat: 'day',
					}
				)

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
			}  
		})
}