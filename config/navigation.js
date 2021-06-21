import React, { useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import ShopScreen from "../screens/ShopScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator>
    <AppDrawer.Screen
      name="ShopScreen"
      component={ShopScreen}
      options={({ route }) => {
        return {
          headerTitle: `${route} ${route}`,
        };
      }}
    />
  </AppDrawer.Navigator>
);

const TopNavigator = createStackNavigator();
const TopNavigatorScreen = () => (
  <TopNavigator.Navigator>
    <TopNavigator.Screen
      name='temp'
      component={AppDrawerScreen}
      options={{
        navigationIcon: (props) => (
          <Ionicons
            name="ios-contacts"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />

    <TopNavigator.Screen
      name="ProductDetailScreen"
      component={ProductDetailScreen}
      options={{
        cartIcon: (props) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}

          />
        ),
      }}
    />
  </TopNavigator.Navigator>
);

// /*********/
// // modal
// /************/
// const RootStack = createStackNavigator();
// const RootStackScreen = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(!isLoading);
//       setUser({});
//     }, 500);
//   }, []);

//   return (
//     <RootStack.Navigator
//       headerMode="none"
//       screenOptions={{ animationEnabled: false }}
//       mode="modal"
//     >
//       {isLoading ? (
//         <RootStack.Screen name="Loading" component={loading} />
//       ) : user ? (
//         <RootStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
//       ) : (
//         <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
//       )}
//       <RootStack.Screen
//         name="Modal"
//         component={Modal}
//         options={{ animated: true }}
//       />
//     </RootStack.Navigator>
//   );
// };

export default () => (
  <NavigationContainer>
    <TopNavigatorScreen />
  </NavigationContainer>
);



const ActionsStack = createStackNavigator();
const ActionsStackScreen = () => (
  <ActionsStack.Navigator>
    <ActionsStack.Screen name="OrdersScreen" component={OrdersScreen} />
    <ActionsStack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
  </ActionsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Contacts"
      component={ProductDetailScreen}
      options={{
        tabBarIcon: (props) => (
          <Ionicons name="people" size={props.size} color={props.color} />
        ),
      }}
    />
    <AppTabs.Screen
      name="Actions"
      component={ActionsStackScreen}
      options={{
        tabBarIcon: (props) => (
          <Ionicons
            name="checkmark-circle-outline"
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
  </AppTabs.Navigator>
);

