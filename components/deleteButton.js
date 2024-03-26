import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
});

const DeleteButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Delete</Text>
  </TouchableOpacity>
);

export default DeleteButton;