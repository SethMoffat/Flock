// screens/FeedScreen.js

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function FeedScreen() {
  // Dummy data for the posts
  const posts = ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flock</Text>
      <ScrollView>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <Text>{post}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  post: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});