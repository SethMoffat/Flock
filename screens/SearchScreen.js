import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import celebrityList from '../constants/celebrityList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  birthDate: {
    fontSize: 16,
  },
  disclaimerText: {
    fontSize: 10, 
    marginTop: 10,
  },
});

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [celebData, setCelebData] = useState(null);
  const navigation = useNavigation();

  // Use the context

  useEffect(() => {
    if (query) {
      console.log('Search query:', query);
      // Find the first celebrity that matches the query
      const foundCeleb = celebrityList.find(celeb => celeb.name.toLowerCase().includes(query.toLowerCase()));
      setCelebData(foundCeleb || null);
    } else {
      setCelebData(null);
    }
  }, [query]);

  const followCelebrity = async (celebrity) => {
    Alert.alert(`Followed ${celebrity.name}`);
    try {
      // Get the followed celebrities from AsyncStorage
      const followedCelebrities = await AsyncStorage.getItem('followedCelebrities');
      let newFollowedCelebrities = [];
      if (followedCelebrities !== null) {
        newFollowedCelebrities = JSON.parse(followedCelebrities);
      }
      // Add the new celebrity to the followed celebrities
      newFollowedCelebrities.push(celebrity.name);
      // Save the followed celebrities back to AsyncStorage
      await AsyncStorage.setItem('followedCelebrities', JSON.stringify(newFollowedCelebrities));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        value={query} 
        onChangeText={setQuery} 
        placeholder="Search for a celebrity (Simulated)" 
      />
      {celebData && (
        <TouchableOpacity onPress={() => followCelebrity(celebData)}>
          <View>
            <Text style={styles.name}>{celebData.name}</Text>
            <Text style={styles.birthDate}>{celebData.birthDate}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}