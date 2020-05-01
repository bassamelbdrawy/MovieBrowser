import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import MovieScreen from '../screens/MovieScreen/MovieScreen'


const Stack = createStackNavigator();

function AppNav() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Movie" component={MovieScreen}  
                        options={({ route }) => ({ title: route.params.Title,  headerTitleStyle: {
                            maxWidth:200,
                          },})}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
  }

  export default AppNav;

