import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import Login from "../screens/SignUp";
import SignUp from "../screens/SignUp";

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
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
