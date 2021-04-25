import React from 'react';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import { RootStackParamList } from '../types';
import { RouteProp } from '@react-navigation/native';
import TopStories from '../screens/TopStories';

export type HomeParamList = {
  TopStories: undefined;
  Details: undefined;
};

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};

const Stack = createStackNavigator<HomeParamList>()

const StoriesStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="TopStories" component={TopStories} />
  </Stack.Navigator>
)

export default StoriesStackNavigator;


