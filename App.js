import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {Colors} from './src/config';
import Route from './src';
// import Loader from './src/components/Loader';
// import { ToastComponent } from './src/components';

class App extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.Secondary}}>
        <StatusBar backgroundColor={Colors.Primary} barStyle="light-content" />
        {/* <Loader /> */}
        <Route />
        {/* <ToastComponent/> */}
      </View>
    );
  }
}
export default App;
