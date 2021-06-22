import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { ActivityIndicator } from 'react-native'

import Modal from './Modal'
import Loading from './Loading'
import RootDrawerNavigation from './RootDrawerNavigation'

const RootStack = createStackNavigator();
const RootStackScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(!isLoading)
            setUser({})
        }, 500);
    }, []);

    return (
        <RootStack.Navigator
                    headerMode="none"
                  screenOptions={{ animationEnabled: false }}
    mode="modal" >
        {isLoading ? (
        <RootStack.Screen name="Loading" component={Loading} />
      ) : user ? (
        <RootStack.Screen name="rootDrawer" component={RootDrawerNavigation} />
      ) : (
          /** if user is not authorized */
        <RootStack.Screen name="RootDrawerNavigation" component={RootDrawerNavigation} />
      )}
        <RootStack.Screen
        name="Modal"
        component={Modal}
        options={{ animationEnabled: true }}
      />
      <RootStack.Screen
        name="Alert"
        component={Modal}
        options={{
          animationEnabled: true,
          cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
         </RootStack.Navigator>
    )
}


export default () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
);



