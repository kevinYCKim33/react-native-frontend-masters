/* eslint-disable react/react-in-jsx-scope */
// https://kadikraman.github.io/react-native-v2/
// App.js

import React from 'react';
import 'react-native-gesture-handler'; // something mysterious not covered in text
import { NavigationContainer } from '@react-navigation/native'; // native's React Router
import Home from './screens/Home';
import ColorPalette from './screens/ColorPalette';
import { createStackNavigator } from '@react-navigation/stack';
import ColorPaletteModal from './screens/ColorPaletteModal';

const RootStack = createStackNavigator(); // each of these end up being its own modal
const MainStack = createStackNavigator(); // MainStackNavigator, MainStack.Screen all fall into here

// this stack has its own stack system
const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      {/* names are super critical in XStack navigation.navigate */}
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
        // what the top banner gets labelled as
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        {/* The Main Stack Screen IS a modal in an inception kind of way */}
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }} // must do this to avoid having two top navs in our main stack
        />
        <RootStack.Screen name="AddNewPalette" component={ColorPaletteModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
