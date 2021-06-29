import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import SignInScreen from "../screens/user/SignInScreen";
import SignUpScreen from "../screens/user/SignUpScreen";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  const isAuth = useSelector((rootState) => rootState.isAuth);
  const { replace } = useNavigation();

  useEffect(() => {
    if (isAuth) {
      replace("LeftDrawer");
    }
  }, [isAuth]);

  return (
    <Stack.Navigator>
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
