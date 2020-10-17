import React from 'react';
import { StyleSheet, View } from 'react-native';

import OrphanagesMap from './src/pages/OrphanagesMap/OrphanagesMap';

export default function App() {
  return (
    <View style={styles.container}>
      <OrphanagesMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
