import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export function TagNativeBase(): JSX.Element {
  return (
    <View>
      <Text style={styles.tag}>Daniel</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: 'white',
    color: 'black',
    marginVertical: 20,
    padding: 10,
    shadowColor: '#171717',
    elevation: 10,
  },
});
