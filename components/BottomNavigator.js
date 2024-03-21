import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({ // Destructure route from argument
        tabBarActiveTintColor: 'tomato', // Updated color for active tab
        tabBarInactiveTintColor: 'gray', // Updated color for inactive tab
        tabBarIcon: ({ color, size }) => { // Icon rendering logic
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'information-circle'; // Correct icon name for Feed
          } else if (route.name === 'Search') {
            iconName = 'search'; // Correct icon name for Search
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}
