import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from '../screens/user/AuthScreen'

const AppStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AppStack.Navigator mode="modal">
      <AppStack.Screen name="SignIn"  component={AuthScreen}  />
    </AppStack.Navigator>
  );
};

export default AuthStackScreen;
