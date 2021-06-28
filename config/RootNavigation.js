import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import Modal from "../screens/Modal";
import RootDrawerNavigation from "./RootDrawerNavigation";
import AuthStackScreen from "./AuthStackScreen";

import HeaderLeft from "./HeaderIcons/HeaderLeft";

const RootStack = createStackNavigator();
export const RootNavigation = () => {
  const isAuth = useSelector((rootReducer) => rootReducer.isAuth);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode='none'
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? "black" : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : "black",
          title: "",
        }}
        mode='modal'
        initialRouteName='AuthStackScreen'
      >
        {isAuth && <RootDrawerNavigation name='RootDrawer' />}
        {!isAuth && <AuthStackScreen name='AuthStackScreen' />}

        <RootStack.Screen
          name='Modal'
          component={Modal}
          options={{ animationEnabled: true }}
        />

        <RootStack.Screen
          name='ShopScreen'
          component={ShopScreen}
          headerMode='screen'
          options={({ navigation, route }) => ({
            headerLeft: (props) => (
              <HeaderLeft
                {...props}
                onOpenMenu={() => navigation.toggleDrawer()}
              />
            ),
            headerRight: (props) => (
              <HeaderRight
                {...props}
                onOpenCart={() => navigation.navigate("CartScreen")}
              />
            ),
            headerTitle: "Shopy Shop",
            headerTitleStyle: { alignSelf: "center" },
          })}
        />

        <RootStack.Screen
          name='ProductDetailScreen'
          component={ProductDetailScreen}
          options={({ navigation, route }) => ({
            headerRight: (props) => (
              <HeaderRight
                {...props}
                onOpenCart={() => navigation.navigate("CartScreen")}
              />
            ),
            headerTitle: "Shopy Shop",
            headerTitleStyle: { alignSelf: "center" },
          })}
        />

        <RootStack.Screen
          name='OrdersScreen'
          component={OrdersScreen}
          options={({ navigation, route }) => ({
            headerLeft: (props) => (
              <HeaderLeft
                {...props}
                onOpenMenu={() => navigation.toggleDrawer()}
              />
            ),
            headerTitle: "Orders",
            headerTitleStyle: { alignSelf: "center" },
          })}
        />

        <RootStack.Screen
          name='CartScreen'
          component={CartScreen}
          options={{
            headerTitle: "Cart",
            headerTitleStyle: { alignSelf: "center" },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
