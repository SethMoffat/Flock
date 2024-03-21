import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

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

const imdbDisclaimer = (
  <Text style={styles.disclaimerText}>
    **Disclaimer:** This is a simulated example for educational purposes only.
    Respect IMDb's terms of service and robots.txt. Consider using IMDb's official API for reliable and ethical data access.
  </Text>
);

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [celebData, setCelebData] = useState(null);

  // Simulate data fetching (replace with IMDb API integration if available)
  useEffect(() => {
    if (query) {
      console.log('Search query:', query);
      // Simulate data (replace with actual data parsing logic)
      const simulatedData = {
        name: 'Sample Celebrity Name',
        birthDate: '1980-01-01', // Sample birth date for simulation
      };
      setCelebData(simulatedData);
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
      {imdbDisclaimer}
    </View>
  );
}