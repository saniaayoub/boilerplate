import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './AuthStack';
import {HomeStack} from './HomeStack';
import {useSelector} from 'react-redux';

export const MainStackNavigator = () => {
  const MainStackNavigator = createNativeStackNavigator();
  const AppStacks = [...AuthStack, ...HomeStack];
  const user = useSelector(state => state.AppReducer.user);
  useEffect(() => {
    console.log('user data', user);
  }, []);
  return (
    <MainStackNavigator.Navigator
      initialRouteName={user.email ? 'Home' : 'Splash'}
      screenOptions={{
        headerShown: false,
      }}>
      {AppStacks.map(stack => (
        <MainStackNavigator.Screen {...stack} />
      ))}
    </MainStackNavigator.Navigator>
  );
};
