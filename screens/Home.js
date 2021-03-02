import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  FlatList, // never do .map in Native
  RefreshControl,
  Text,
  TouchableOpacity, // basically a button in React
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const URL = 'https://color-palette-api.kadikraman.now.sh/palettes';

// anything wrapped .Navigator gets its own {navigation} prop
const Home = ({ navigation, route }) => {
  const newColorPalette = route.params?.newColorPalette; // truthy only when submitting through ColorPaletteModal
  const [palettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // just pretty normal fetching stuff and stuffing it into state
  useEffect(() => {
    handleFetchPalettes();
  }, []);

  // this will only trigger when coming from the color creator modal
  useEffect(() => {
    if (newColorPalette) {
      // just good 'ol functional component stuff
      setColorPalettes((palettes) => [newColorPalette, ...palettes]);
    }
  }, [newColorPalette]);

  const handleFetchPalettes = useCallback(async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const palettes = await response.json();
      setColorPalettes(palettes);
    }
  }, []);

  // they have a penchant for useCallback that is debatable but oh well
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchPalettes();
    // API too fast so add this delay to really see the spinner
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  });

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={
          () => navigation.navigate('AddNewPalette') // basically history.push
          // AddNewPalette actually goes out of this MainStack and goes into RootStack; hence you get that modal effect
        }
      >
        <Text style={styles.buttonText}>Add a color scheme</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        // spinner magic
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        data={palettes}
        keyExtractor={(item) => item.paletteName}
        renderItem={({ item }) => {
          return (
            <PalettePreview
              // item
              // {id: 1, paletteName: "Frontend Masters", colors: Array(5)}
              // colors:
              /*
                0: {colorName: "Red", hexCode: "#c02d28"}
                1: {colorName: "Black", hexCode: "#3e3e3e"}
                2: {colorName: "Grey", hexCode: "#8a8a8a"}
                3: {colorName: "White", hexCode: "#ffffff"}
                4: {colorName: "Orange", hexCode: "#e66225"}
              */
              // passing in item is what gives ColorPalette each its own unique page
              onPress={() => navigation.navigate('ColorPalette', item)}
              palette={item}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
    backgroundColor: 'white',
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'teal',
  },
});

export default Home;
