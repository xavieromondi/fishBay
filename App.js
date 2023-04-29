import { View, Text } from "react-native";
import React from "react";
import { CartProvider } from "./CartContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PayScreen from "./screens/PayScreen";
import DetailsScreen from "./screens/DetailsScreen";
import CartScreen from "./screens/CartScreen";
import UserInfoScreen from "./screens/UserInfoScreen";
import MapScreen from "./screens/MapScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SingUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="User" component={UserInfoScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Pay" component={PayScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
