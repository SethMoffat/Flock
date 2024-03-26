import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'; // Remove Button
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteButton from '../components/deleteButton'; 
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row', // Change to row direction
    justifyContent: 'space-between', // Add space between the Text and DeleteButton
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function FollowingScreen() {
    const [followedCelebrities, setFollowedCelebrities] = useState([]);
  
    const fetchFollowedCelebrities = async () => {
      try {
        // Get the followed celebrities from AsyncStorage
        const followedCelebrities = await AsyncStorage.getItem('followedCelebrities');
        console.log('Fetched from storage:', followedCelebrities); // Debug line
        if (followedCelebrities !== null) {
          // If there are followed celebrities, set them to the state
          setFollowedCelebrities(JSON.parse(followedCelebrities));
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    useFocusEffect(
      React.useCallback(() => {
        fetchFollowedCelebrities();
      }, [])
    );
  
  const deleteCelebrity = async (celebrity) => {
    try {
      // Filter out the celebrity to be deleted
      const newFollowedCelebrities = followedCelebrities.filter(item => item !== celebrity);
      // Save the new followed celebrities back to AsyncStorage
      await AsyncStorage.setItem('followedCelebrities', JSON.stringify(newFollowedCelebrities));
      // Update the state
      setFollowedCelebrities(newFollowedCelebrities);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
      <View style={styles.container}>
        <FlatList
          data={followedCelebrities}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item}</Text>
              <DeleteButton onPress={() => deleteCelebrity(item)} />
            </View>
          )}
          keyExtractor={item => item}
        />
      </View>
    );
  }