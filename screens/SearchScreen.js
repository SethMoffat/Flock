import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
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

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        value={query} 
        onChangeText={setQuery} 
        placeholder="Search for a celebrity (Simulated)" 
      />
      {celebData && (
        <View>
          <Text style={styles.name}>{celebData.name}</Text>
          <Text style={styles.birthDate}>{celebData.birthDate}</Text>
        </View>
      )}
    </View>
  );
}