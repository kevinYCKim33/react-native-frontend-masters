// screens/ColorPalette.js

import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  // route.params: {id: 1, paletteName: "Frontend Masters", colors: Array(5)}
  // colors:
  /*
    0: {colorName: "Red", hexCode: "#c02d28"}
    1: {colorName: "Black", hexCode: "#3e3e3e"}
    2: {colorName: "Grey", hexCode: "#8a8a8a"}
    3: {colorName: "White", hexCode: "#ffffff"}
    4: {colorName: "Orange", hexCode: "#e66225"}
  */
  const { colors } = route.params; // probably the clutchest line
  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={(item) => item.hexCode}
      renderItem={({ item }) => (
        <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ColorPalette;
