import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import scrapeInstagram from '../Scraper'; // Import scrapeInstagram from Scraper

export default function FeedScreen() {
  const [posts, setPosts] = useState([]); // Create state for posts

  useEffect(() => {
    const fetchPosts = async () => {
      // Get the followed celebrities from AsyncStorage
      const followedCelebrities = JSON.parse(await AsyncStorage.getItem('followedCelebrities')) || [];
      // Get the handles of the followed celebrities
      const handles = followedCelebrities.map(celeb => celeb.handle);
      // Initialize an empty array for all posts
      const allPosts = [];
      // Iterate over each handle and fetch the posts
      for (const handle of handles) {
        const posts = await scrapeInstagram(handle);
        allPosts.push(...posts);
      }
      // Set the fetched posts to the state
      setPosts(allPosts);
      console.log('Fetched posts:', allPosts); // Debug line
    };
  
    fetchPosts();
  }, []);

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